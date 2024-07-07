export interface NmSDKConfigs {
    api_key: string | null;
    movieStoreObservable: boolean;
    randomMovieKeywords: string[];
}

export namespace SDKConfigs {
    export var value: NmSDKConfigs = {
        api_key: null,
        movieStoreObservable: true,
        randomMovieKeywords: []
    }
}