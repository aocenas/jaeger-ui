import React from 'react';
import { Span } from '../types/trace';
export declare const getStyles: () => {
    SpanTreeOffset: string;
    SpanTreeOffsetParent: string;
    indentGuide: string;
    indentGuideActive: string;
    iconWrapper: string;
};
declare type TProps = {
    childrenVisible?: boolean;
    onClick?: () => void;
    span: Span;
    showChildrenIcon?: boolean;
    hoverIndentGuideIds: Set<string>;
    addHoverIndentGuideId: (spanID: string) => void;
    removeHoverIndentGuideId: (spanID: string) => void;
};
export default class SpanTreeOffset extends React.PureComponent<TProps> {
    ancestorIds: string[];
    static defaultProps: {
        childrenVisible: boolean;
        onClick: undefined;
        showChildrenIcon: boolean;
    };
    constructor(props: TProps);
    /**
     * If the mouse leaves to anywhere except another span with the same ancestor id, this span's ancestor id is
     * removed from the set of hoverIndentGuideIds.
     *
     * @param {Object} event - React Synthetic event tied to mouseleave. Includes the related target which is
     *     the element the user is now hovering.
     * @param {string} ancestorId - The span id that the user was hovering over.
     */
    handleMouseLeave: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, ancestorId: string) => void;
    /**
     * If the mouse entered this span from anywhere except another span with the same ancestor id, this span's
     * ancestorId is added to the set of hoverIndentGuideIds.
     *
     * @param {Object} event - React Synthetic event tied to mouseenter. Includes the related target which is
     *     the last element the user was hovering.
     * @param {string} ancestorId - The span id that the user is now hovering over.
     */
    handleMouseEnter: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, ancestorId: string) => void;
    render(): JSX.Element;
}
export {};
