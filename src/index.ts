export * from './models/Movie';
export * from './store/MovieStore';
export { NmSDKConfigs } from './models/Configs'
import { NmSDKConfigs, SDKConfigs } from './models/Configs';

export class NMovieSDK {
    static config(cfg: NmSDKConfigs) {  
        SDKConfigs.value = cfg;
    }
}