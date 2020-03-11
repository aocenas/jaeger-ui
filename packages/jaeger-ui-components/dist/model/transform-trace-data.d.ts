import { KeyValuePair, SpanData, Trace, TraceData } from '../types/trace';
export declare function deduplicateTags(spanTags: KeyValuePair[]): {
    tags: KeyValuePair[];
    warnings: string[];
};
export declare function orderTags(spanTags: KeyValuePair[], topPrefixes?: string[]): KeyValuePair[];
/**
 * NOTE: Mutates `data` - Transform the HTTP response data into the form the app
 * generally requires.
 */
export default function transformTraceData(data: TraceData & {
    spans: SpanData[];
}): Trace | null;
