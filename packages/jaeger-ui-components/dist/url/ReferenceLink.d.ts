import React from 'react';
import { SpanReference } from '../types/trace';
declare type ReferenceLinkProps = {
    reference: SpanReference;
    children: React.ReactNode;
    className?: string;
    focusSpan: (spanID: string) => void;
    onClick?: () => void;
};
export default function ReferenceLink(props: ReferenceLinkProps): JSX.Element;
export {};
