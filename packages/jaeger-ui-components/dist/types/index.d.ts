import { ApiError } from './api-error';
import TNil from './TNil';
import { Trace } from './trace';
export declare type TNil = TNil;
export declare type FetchedState = 'FETCH_DONE' | 'FETCH_ERROR' | 'FETCH_LOADING';
export declare type FetchedTrace = {
    data?: Trace;
    error?: ApiError;
    id: string;
    state?: FetchedState;
};
