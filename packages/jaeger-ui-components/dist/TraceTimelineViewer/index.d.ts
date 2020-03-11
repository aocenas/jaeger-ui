import React from 'react';
import { Accessors } from '../ScrollManager';
import { TUpdateViewRangeTimeFunction, IViewRange, ViewRangeTimeUpdate } from './types';
import { TNil } from '../types';
import { Span, Trace, Log, KeyValuePair, Link } from '../types/trace';
import TTraceTimeline from '../types/TTraceTimeline';
declare type TExtractUiFindFromStateReturn = {
    uiFind: string | undefined;
};
declare type TProps = TExtractUiFindFromStateReturn & {
    registerAccessors: (accessors: Accessors) => void;
    findMatchesIDs: Set<string> | TNil;
    scrollToFirstVisibleSpan: () => void;
    traceTimeline: TTraceTimeline;
    trace: Trace;
    updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    viewRange: IViewRange;
    focusSpan: (uiFind: string) => void;
    createLinkToExternalSpan: (traceID: string, spanID: string) => string;
    setSpanNameColumnWidth: (width: number) => void;
    collapseAll: (spans: Span[]) => void;
    collapseOne: (spans: Span[]) => void;
    expandAll: () => void;
    expandOne: (spans: Span[]) => void;
    childrenToggle: (spanID: string) => void;
    clearShouldScrollToFirstUiFindMatch: () => void;
    detailLogItemToggle: (spanID: string, log: Log) => void;
    detailLogsToggle: (spanID: string) => void;
    detailWarningsToggle: (spanID: string) => void;
    detailReferencesToggle: (spanID: string) => void;
    detailProcessToggle: (spanID: string) => void;
    detailTagsToggle: (spanID: string) => void;
    detailToggle: (spanID: string) => void;
    setTrace: (trace: Trace | TNil, uiFind: string | TNil) => void;
    addHoverIndentGuideId: (spanID: string) => void;
    removeHoverIndentGuideId: (spanID: string) => void;
    linksGetter: (span: Span, items: KeyValuePair[], itemIndex: number) => Link[];
};
/**
 * `TraceTimelineViewer` now renders the header row because it is sensitive to
 * `props.viewRange.time.cursor`. If `VirtualizedTraceView` renders it, it will
 * re-render the ListView every time the cursor is moved on the trace minimap
 * or `TimelineHeaderRow`.
 */
export default class TraceTimelineViewer extends React.PureComponent<TProps> {
    componentDidMount(): void;
    collapseAll: () => void;
    collapseOne: () => void;
    expandAll: () => void;
    expandOne: () => void;
    render(): JSX.Element;
}
export {};
