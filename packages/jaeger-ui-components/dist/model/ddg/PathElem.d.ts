import { TDdgOperation, TDdgPath } from './types';
export default class PathElem {
    memberIdx: number;
    memberOf: TDdgPath;
    operation: TDdgOperation;
    private _visibilityIdx?;
    constructor({ path, operation, memberIdx, }: {
        path: TDdgPath;
        operation: TDdgOperation;
        memberIdx: number;
    });
    readonly distance: number;
    readonly externalPath: PathElem[];
    readonly externalSideNeighbor: PathElem | null | undefined;
    readonly focalPath: PathElem[];
    readonly focalSideNeighbor: PathElem | null;
    readonly isExternal: boolean;
    visibilityIdx: number;
    private toJSONHelper;
    toJSON(): {
        memberOf: {
            focalIdx: number;
            members: {
                memberIdx: number;
                operation: string;
                service: string;
                visibilityIdx: number | undefined;
            }[];
        };
        memberIdx: number;
        operation: string;
        service: string;
        visibilityIdx: number | undefined;
    };
    toString(): string;
    readonly [Symbol.toStringTag]: string;
}
