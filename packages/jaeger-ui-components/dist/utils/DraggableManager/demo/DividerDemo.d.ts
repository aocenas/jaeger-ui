import React from 'react';
import { DraggableBounds, DraggingUpdate } from '..';
import DraggableManager from '../DraggableManager';
import TNil from '../../../types/TNil';
import './DividerDemo.css';
declare type DividerDemoProps = {
    position: number;
    updateState: (udpate: {
        dividerPosition: number;
    }) => void;
};
export default class DividerDemo extends React.PureComponent<DividerDemoProps> {
    _dragManager: DraggableManager;
    _realmElm: HTMLElement | TNil;
    constructor(props: DividerDemoProps);
    _setRealm: (elm: HTMLElement | null | undefined) => void;
    _getDraggingBounds: () => DraggableBounds;
    _handleDragEvent: ({ value }: DraggingUpdate) => void;
    render(): JSX.Element;
}
export {};
