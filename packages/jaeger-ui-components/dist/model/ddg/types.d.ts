import PathElem from './PathElem';
export { default as PathElem } from './PathElem';
export declare type TDdgService = {
    name: string;
    operations: Map<string, TDdgOperation>;
};
export declare type TDdgOperation = {
    name: string;
    pathElems: PathElem[];
    service: TDdgService;
};
export declare type TDdgServiceMap = Map<string, TDdgService>;
export declare type TDdgPath = {
    focalIdx: number;
    members: PathElem[];
    traceIDs: string[];
};
export declare type TDdgDistanceToPathElems = Map<number, PathElem[]>;
export declare type TDdgModel = {
    distanceToPathElems: TDdgDistanceToPathElems;
    hash: string;
    paths: TDdgPath[];
    services: TDdgServiceMap;
    visIdxToPathElem: PathElem[];
};
