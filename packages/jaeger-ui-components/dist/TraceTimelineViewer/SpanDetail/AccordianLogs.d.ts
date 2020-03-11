/// <reference types="react" />
import { TNil } from '../../types';
import { Log, KeyValuePair, Link } from '../../types/trace';
declare type AccordianLogsProps = {
    interactive?: boolean;
    isOpen: boolean;
    linksGetter: ((pairs: KeyValuePair[], index: number) => Link[]) | TNil;
    logs: Log[];
    onItemToggle?: (log: Log) => void;
    onToggle?: () => void;
    openedItems?: Set<Log>;
    timestamp: number;
};
declare function AccordianLogs(props: AccordianLogsProps): JSX.Element;
declare namespace AccordianLogs {
    var defaultProps: {
        interactive: boolean;
        linksGetter: undefined;
        onItemToggle: undefined;
        onToggle: undefined;
        openedItems: undefined;
    };
}
export default AccordianLogs;
