/// <reference types="react" />
import { TNil } from '../types';
declare type TicksProps = {
    endTime?: number | TNil;
    numTicks: number;
    showLabels?: boolean | TNil;
    startTime?: number | TNil;
};
declare function Ticks(props: TicksProps): JSX.Element;
declare namespace Ticks {
    var defaultProps: {
        endTime: null;
        showLabels: null;
        startTime: null;
    };
}
export default Ticks;
