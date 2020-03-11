import React from 'react';
declare type CollapserProps = {
    onCollapseAll: () => void;
    onCollapseOne: () => void;
    onExpandOne: () => void;
    onExpandAll: () => void;
};
export default class TimelineCollapser extends React.PureComponent<CollapserProps> {
    containerRef: React.RefObject<HTMLDivElement>;
    constructor(props: CollapserProps);
    getContainer: () => HTMLDivElement;
    render(): JSX.Element;
}
export {};
