interface RouterState {
    state: RouterStateUrl;
    navigationId: number;
}

interface RouterStateUrl {
    workspaceName: string;
    url: string;
    queryParams: {
        [key: string]: any;
    };
    params: {
        [key: string]: any;
    };
}
