/// <reference types="react" />
import { TNil } from '../../types';
import { KeyValuePair, Link } from '../../types/trace';
export declare const getStyles: () => {
    header: string;
    headerEmpty: string;
    headerHighContrast: string;
    emptyIcon: string;
    summary: string;
    summaryItem: string;
    summaryLabel: string;
    summaryDelim: string;
};
declare type AccordianKeyValuesProps = {
    className?: string | TNil;
    data: KeyValuePair[];
    highContrast?: boolean;
    interactive?: boolean;
    isOpen: boolean;
    label: string;
    linksGetter: ((pairs: KeyValuePair[], index: number) => Link[]) | TNil;
    onToggle?: null | (() => void);
};
export declare function KeyValuesSummary(props: {
    data?: KeyValuePair[];
}): JSX.Element | null;
export declare namespace KeyValuesSummary {
    var defaultProps: {
        data: null;
    };
}
declare function AccordianKeyValues(props: AccordianKeyValuesProps): JSX.Element;
declare namespace AccordianKeyValues {
    var defaultProps: {
        className: null;
        highContrast: boolean;
        interactive: boolean;
        onToggle: null;
    };
}
export default AccordianKeyValues;
