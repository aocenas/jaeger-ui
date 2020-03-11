/// <reference types="react" />
import DetailState from './DetailState';
import { TNil } from '../../types';
import { KeyValuePair, Link, Log, Span } from '../../types/trace';
declare type SpanDetailProps = {
    detailState: DetailState;
    linksGetter: ((links: KeyValuePair[], index: number) => Link[]) | TNil;
    logItemToggle: (spanID: string, log: Log) => void;
    logsToggle: (spanID: string) => void;
    processToggle: (spanID: string) => void;
    span: Span;
    tagsToggle: (spanID: string) => void;
    traceStartTime: number;
    warningsToggle: (spanID: string) => void;
    referencesToggle: (spanID: string) => void;
    focusSpan: (uiFind: string) => void;
};
export default function SpanDetail(props: SpanDetailProps): JSX.Element;
export {};
