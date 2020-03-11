import * as React from 'react';
import { SpanReference } from '../../types/trace';
declare type AccordianReferencesProps = {
    data: SpanReference[];
    highContrast?: boolean;
    interactive?: boolean;
    isOpen: boolean;
    onToggle?: null | (() => void);
    focusSpan: (uiFind: string) => void;
};
declare type ReferenceItemProps = {
    data: SpanReference[];
    focusSpan: (uiFind: string) => void;
};
export declare function References(props: ReferenceItemProps): JSX.Element;
export default class AccordianReferences extends React.PureComponent<AccordianReferencesProps> {
    static defaultProps: {
        highContrast: boolean;
        interactive: boolean;
        onToggle: null;
    };
    render(): JSX.Element;
}
export {};
