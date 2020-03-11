import { TNil } from '.';
export declare type ConfigMenuItem = {
    label: string;
    url: string;
    anchorTarget?: '_self' | '_blank' | '_parent' | '_top';
};
export declare type ConfigMenuGroup = {
    label: string;
    items: ConfigMenuItem[];
};
export declare type TScript = {
    text: string;
    type: 'inline';
};
export declare type LinkPatternsConfig = {
    type: 'process' | 'tags' | 'logs' | 'traces';
    key?: string;
    url: string;
    text: string;
};
export declare type Config = {
    archiveEnabled?: boolean;
    deepDependencies?: {
        menuEnabled?: boolean;
    };
    dependencies?: {
        dagMaxServicesLen?: number;
        menuEnabled?: boolean;
    };
    menu: (ConfigMenuGroup | ConfigMenuItem)[];
    search?: {
        maxLookback: {
            label: string;
            value: string;
        };
        maxLimit: number;
    };
    scripts?: TScript[];
    topTagPrefixes?: string[];
    tracking?: {
        cookieToDimension?: {
            cookie: string;
            dimension: string;
        }[];
        gaID: string | TNil;
        trackErrors: boolean | TNil;
    };
    linkPatterns?: LinkPatternsConfig;
};
