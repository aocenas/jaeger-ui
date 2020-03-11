import * as React from 'react';
import { TUpdateViewRangeTimeFunction, IViewRangeTime, ViewRangeTimeUpdate } from '../types';
import { TNil } from '../../types';
import DraggableManager, { DraggableBounds, DraggingUpdate } from '../../utils/DraggableManager';
export declare const getStyles: () => {
    TimelineViewingLayer: string;
    cursorGuide: string;
    dragged: string;
    draggedDraggingLeft: string;
    draggedDraggingRight: string;
    draggedShiftDrag: string;
    draggedReframeDrag: string;
    fullOverlay: string;
};
declare type TimelineViewingLayerProps = {
    /**
     * `boundsInvalidator` is an arbitrary prop that lets the component know the
     * bounds for dragging need to be recalculated. In practice, the name column
     * width serves fine for this.
     */
    boundsInvalidator: any | null | undefined;
    updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    viewRangeTime: IViewRangeTime;
};
/**
 * `TimelineViewingLayer` is rendered on top of the TimelineHeaderRow time
 * labels; it handles showing the current view range and handles mouse UX for
 * modifying it.
 */
export default class TimelineViewingLayer extends React.PureComponent<TimelineViewingLayerProps> {
    _draggerReframe: DraggableManager;
    _root: Element | TNil;
    constructor(props: TimelineViewingLayerProps);
    componentWillReceiveProps(nextProps: TimelineViewingLayerProps): void;
    componentWillUnmount(): void;
    _setRoot: (elm: Element | null | undefined) => void;
    _getDraggingBounds: () => DraggableBounds;
    _handleReframeMouseMove: ({ value }: DraggingUpdate) => void;
    _handleReframeMouseLeave: () => void;
    _handleReframeDragUpdate: ({ value }: DraggingUpdate) => void;
    _handleReframeDragEnd: ({ manager, value }: DraggingUpdate) => void;
    render(): JSX.Element;
}
export {};
