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
            context: newPost.context,
            banner: newPost.banner,
            featured: newPost.featured
        })
    });

    tx.addTag('App-Name', getAppName());
    tx.addTag('App-Version', getVersionName());
    tx.addTag('Type', 'Post');
    
    await arweave.transactions.sign(tx, key);
    await arweave.transactions.post(tx);
    
    //////////////////////////////////////////////////////////
    if (newPost.featured){
        let tip = parseInt(tx.reward)/5
        tip = tip.toString();
    
        const tipTx = await arweave.createTransaction({
            target: 'DIXlCw7Q_AB8P5XasurBn6XhQnmhHgu5cg9863fz5WQ',
            quantity: arweave.ar.winstonToAr(tip)
        })
    
        tipTx.addTag('App-Name', getAppName());
        tipTx.addTag('Type', 'Tip');
    
        await arweave.transactions.sign(tipTx, key);
        await arweave.transactions.post(tipTx);
    }
        
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
                let txid = tx.id
                tx = JSON.parse(res)
                tx.id = txid
                if (index < 3) {
                    tx.tag.push('New');
                }
                if (tx.featured) {
                    tx.tag.push('Featured');
                }
                posts[index] = tx;
            })
        })

        return posts;  
    } catch(e) {
        console.log(e)
    }    
}