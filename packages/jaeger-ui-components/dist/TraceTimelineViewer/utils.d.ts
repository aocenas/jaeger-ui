import { Span } from '../types/trace';
export declare type ViewedBoundsFunctionType = (start: number, end: number) => {
    start: number;
    end: number;
};
/**
 * Given a range (`min`, `max`) and factoring in a zoom (`viewStart`, `viewEnd`)
 * a function is created that will find the position of a sub-range (`start`, `end`).
 * The calling the generated method will return the result as a `{ start, end }`
 * object with values ranging in [0, 1].
 *
 * @param  {number} min       The start of the outer range.
 * @param  {number} max       The end of the outer range.
 * @param  {number} viewStart The start of the zoom, on a range of [0, 1],
 *                            relative to the `min`, `max`.
 * @param  {number} viewEnd   The end of the zoom, on a range of [0, 1],
 *                            relative to the `min`, `max`.
 * @returns {(number, number) => Object} Created view bounds function
 */
export declare function createViewedBoundsFunc(viewRange: {
    min: number;
    max: number;
    viewStart: number;
    viewEnd: number;
}): (start: number, end: number) => {
    start: number;
    end: number;
};
/**
 * Returns `true` if the `span` has a tag matching `key` = `value`.
 *
 * @param  {string} key   The tag key to match on.
 * @param  {any}    value The tag value to match.
 * @param  {{tags}} span  An object with a `tags` property of { key, value }
 *                        items.
 * @return {boolean}      True if a match was found.
 */
export declare function spanHasTag(key: string, value: any, span: Span): boolean;
export declare const isClientSpan: (span: Span) => boolean;
export declare const isServerSpan: (span: Span) => boolean;
export declare const isErrorSpan: (span: Span) => boolean;
/**
 * Returns `true` if at least one of the descendants of the `parentSpanIndex`
 * span contains an error tag.
 *
 * @param      {Span[]}   spans            The spans for a trace - should be
 *                                         sorted with children following parents.
 * @param      {number}   parentSpanIndex  The index of the parent span - only
 *                                         subsequent spans with depth less than
 *                                         the parent span will be checked.
 * @return     {boolean}  Returns `true` if a descendant contains an error tag.
 */
export declare function spanContainsErredSpan(spans: Span[], parentSpanIndex: number): boolean;
/**
 * Expects the first span to be the parent span.
 */
export declare function findServerChildSpan(spans: Span[]): false | Span | null;
export { formatDuration } from '../utils/date';
