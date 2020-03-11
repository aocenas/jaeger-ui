import { ApiError } from './api-error';
export declare type TraceArchive = {
    isLoading?: boolean;
    isArchived?: boolean;
    isError?: boolean;
    error?: ApiError;
    isAcknowledged?: boolean;
};
export declare type TracesArchive = Record<string, TraceArchive>;
