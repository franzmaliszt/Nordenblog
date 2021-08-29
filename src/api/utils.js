import Package from '../../package.json';

export const currentUnixTime = () => Math.round(new Date().getTime() / 1000);

export const getAppName = () => { return Package.name.charAt(0).toUpperCase() + Package.name.slice(1) };

export const getVersionName = () => { return 'v' + Package.version };