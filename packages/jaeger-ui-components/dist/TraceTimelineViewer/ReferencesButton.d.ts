import React from 'react';
import { SpanReference } from '../types/trace';
export declare const getStyles: () => {
    MultiParent: string;
    TraceRefLink: string;
    NewWindowIcon: string;
    tooltip: string;
};
declare type TReferencesButtonProps = {
    references: SpanReference[];
    children: React.ReactNode;
    tooltipText: string;
    focusSpan: (spanID: string) => void;
};
export default class ReferencesButton extends React.PureComponent<TReferencesButtonProps> {
    referencesList: (references: SpanReference[]) => JSX.Element;
    render(): JSX.Element;
}
export {};
