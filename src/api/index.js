import arweave from './arweave';
import ArDB from 'ardb';
import { getAppName, getVersionName} from './utils';

const ardb = new ArDB(arweave);

export const getWalletAddress = async wallet => arweave.wallets.jwkToAddress(wallet);

export const Upload = async (newPost, key) => {
   const tx = await arweave.createTransaction({
        data: JSON.stringify({
            title: newPost.title, 
            time: newPost.time, 
            tag: newPost.tag, 
            context: newPost.context
        })
    });
    
    tx.addTag('App-Name', getAppName());
    tx.addTag('App-Version', getVersionName());
    tx.addTag('Type', 'Post');
    
    await arweave.transactions.sign(tx, key);
    await arweave.transactions.post(tx);
        
    return true;
};

export const GetPosts = async () => {
    try {
        let txs = await ardb.search('transactions')
        .tag('App-Name', getAppName())
        .tag('App-Version', getVersionName())
        .tag('Type', 'Post')
        .findAll();
        
        let posts = []
        txs.forEach((tx, index) => {
            arweave.transactions.getData(tx.id, { decode: true, string: true }).then(res => {
                tx = JSON.parse(res)
                if (index < 3) {
                    tx.tag.push('New');
                }
                posts[index] = tx;
            })
        })
        return posts;  
    } catch(err) {
        console.log(err)
    }    
}