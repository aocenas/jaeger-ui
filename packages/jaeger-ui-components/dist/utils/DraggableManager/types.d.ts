import * as React from 'react';
import DraggableManager from './DraggableManager';
import EUpdateTypes from './EUpdateTypes';
import { TNil } from '../../types';
export declare type DraggableBounds = {
    clientXLeft: number;
    maxValue?: number;
    minValue?: number;
    width: number;
};
export declare type DraggingUpdate = {
    event: React.MouseEvent<any> | MouseEvent;
    manager: DraggableManager;
    tag: string | TNil;
    type: EUpdateTypes;
    value: number;
    x: number;
};
