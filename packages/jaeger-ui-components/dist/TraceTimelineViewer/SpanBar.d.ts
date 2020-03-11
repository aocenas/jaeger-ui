import React from 'react';
import { ViewedBoundsFunctionType } from './utils';
import { TNil } from '../types';
import { Span } from '../types/trace';
declare type TCommonProps = {
    color: string;
    onClick?: (evt: React.MouseEvent<any>) => void;
    viewEnd: number;
    viewStart: number;
    getViewedBounds: ViewedBoundsFunctionType;
    rpc: {
        viewStart: number;
        viewEnd: number;
        color: string;
    } | TNil;
    traceStartTime: number;
    span: Span;
    className?: string;
    labelClassName?: string;
};
declare type TOuterProps = {
    longLabel: string;
    shortLabel: string;
} & TCommonProps;
declare const _default: React.ComponentClass<TOuterProps, any>;
export default _default;
