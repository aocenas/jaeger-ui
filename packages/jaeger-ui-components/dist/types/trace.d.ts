/**
 * All timestamps are in microseconds
 */
export declare type KeyValuePair = {
    key: string;
    value: any;
};
export declare type Link = {
    url: string;
    text: string;
};
export declare type Log = {
    timestamp: number;
    fields: Array<KeyValuePair>;
};
export declare type Process = {
    serviceName: string;
    tags: Array<KeyValuePair>;
};
export declare type SpanReference = {
    refType: 'CHILD_OF' | 'FOLLOWS_FROM';
    span: Span | null | undefined;
    spanID: string;
    traceID: string;
};
export declare type SpanData = {
    spanID: string;
    traceID: string;
    processID: string;
    operationName: string;
    startTime: number;
    duration: number;
    logs: Array<Log>;
    tags?: Array<KeyValuePair>;
    references?: Array<SpanReference>;
    warnings?: Array<string> | null;
};
export declare type Span = SpanData & {
    depth: number;
    hasChildren: boolean;
    process: Process;
    relativeStartTime: number;
    tags: NonNullable<SpanData['tags']>;
    references: NonNullable<SpanData['references']>;
    warnings: NonNullable<SpanData['warnings']>;
    subsidiarilyReferencedBy: Array<SpanReference>;
};
export declare type TraceData = {
    processes: Record<string, Process>;
    traceID: string;
};
export declare type Trace = TraceData & {
    duration: number;
    endTime: number;
    spans: Span[];
    startTime: number;
    traceName: string;
    services: {
        name: string;
        numberOfSpans: number;
    }[];
};