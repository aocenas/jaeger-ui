/// <reference types="react" />
import { TUpdateViewRangeTimeFunction, IViewRangeTime, ViewRangeTimeUpdate } from '../types';
declare type TimelineHeaderRowProps = {
    duration: number;
    nameColumnWidth: number;
    numTicks: number;
    onCollapseAll: () => void;
    onCollapseOne: () => void;
    onColummWidthChange: (width: number) => void;
    onExpandAll: () => void;
    onExpandOne: () => void;
    updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    viewRangeTime: IViewRangeTime;
};
export default function TimelineHeaderRow(props: TimelineHeaderRowProps): JSX.Element;
export {};
