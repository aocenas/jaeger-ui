import * as React from 'react';
import { TNil } from '../../types';
declare type AccordianTextProps = {
    className?: string | TNil;
    data: string[];
    headerClassName?: string | TNil;
    highContrast?: boolean;
    interactive?: boolean;
    isOpen: boolean;
    label: React.ReactNode;
    onToggle?: null | (() => void);
};
declare function AccordianText(props: AccordianTextProps): JSX.Element;
declare namespace AccordianText {
    var defaultProps: {
        className: null;
        highContrast: boolean;
        interactive: boolean;
        onToggle: null;
    };
}
export default AccordianText;
