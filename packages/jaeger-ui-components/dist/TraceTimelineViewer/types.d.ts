import { TNil } from '../types';
interface ITimeCursorUpdate {
    cursor: number | TNil;
}
interface ITimeReframeUpdate {
    reframe: {
        anchor: number;
        shift: number;
    };
}
interface ITimeShiftEndUpdate {
    shiftEnd: number;
}
interface ITimeShiftStartUpdate {
    shiftStart: number;
}
export declare type TUpdateViewRangeTimeFunction = (start: number, end: number, trackSrc?: string) => void;
export declare type ViewRangeTimeUpdate = ITimeCursorUpdate | ITimeReframeUpdate | ITimeShiftEndUpdate | ITimeShiftStartUpdate;
export interface IViewRangeTime {
    current: [number, number];
    cursor?: number | TNil;
    reframe?: {
        anchor: number;
        shift: number;
    };
    shiftEnd?: number;
    shiftStart?: number;
}
export interface IViewRange {
    time: IViewRangeTime;
}
export {};
