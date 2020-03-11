/// <reference types="react" />
import { DraggableBounds, DraggingUpdate } from './types';
import { TNil } from '../../types';
declare type DraggableManagerOptions = {
    getBounds: (tag: string | TNil) => DraggableBounds;
    onMouseEnter?: (update: DraggingUpdate) => void;
    onMouseLeave?: (update: DraggingUpdate) => void;
    onMouseMove?: (update: DraggingUpdate) => void;
    onDragStart?: (update: DraggingUpdate) => void;
    onDragMove?: (update: DraggingUpdate) => void;
    onDragEnd?: (update: DraggingUpdate) => void;
    resetBoundsOnResize?: boolean;
    tag?: string;
};
export default class DraggableManager {
    _bounds: DraggableBounds | TNil;
    _isDragging: boolean;
    _onMouseEnter: ((update: DraggingUpdate) => void) | TNil;
    _onMouseLeave: ((update: DraggingUpdate) => void) | TNil;
    _onMouseMove: ((update: DraggingUpdate) => void) | TNil;
    _onDragStart: ((update: DraggingUpdate) => void) | TNil;
    _onDragMove: ((update: DraggingUpdate) => void) | TNil;
    _onDragEnd: ((update: DraggingUpdate) => void) | TNil;
    _resetBoundsOnResize: boolean;
    /**
     * Get the `DraggableBounds` for the current drag. The returned value is
     * cached until either `#resetBounds()` is called or the window is resized
     * (assuming `_resetBoundsOnResize` is `true`). The `DraggableBounds` defines
     * the range the current drag can span to. It also establishes the left offset
     * to adjust `clientX` by (from the `MouseEvent`s).
     */
    getBounds: (tag: string | TNil) => DraggableBounds;
    tag: string | TNil;
    handleMouseEnter: (event: React.MouseEvent<any>) => void;
    handleMouseMove: (event: React.MouseEvent<any>) => void;
    handleMouseLeave: (event: React.MouseEvent<any>) => void;
    handleMouseDown: (event: React.MouseEvent<any>) => void;
    constructor({ getBounds, tag, resetBoundsOnResize, ...rest }: DraggableManagerOptions);
    _getBounds(): DraggableBounds;
    _getPosition(clientX: number): {
        value: number;
        x: number;
    };
    _stopDragging(): void;
    isDragging(): boolean;
    dispose(): void;
    resetBounds: () => void;
    _handleMinorMouseEvent: (event: import("react").MouseEvent<any, MouseEvent>) => void;
    _handleDragEvent: (event: MouseEvent | import("react").MouseEvent<any, MouseEvent>) => void;
}
export {};
