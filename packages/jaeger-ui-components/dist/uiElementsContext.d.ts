import React from 'react';
export declare type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
export declare type PopoverProps = {
    content?: React.ReactNode;
    arrowPointAtCenter?: boolean;
    overlayClassName?: string;
    placement?: TooltipPlacement;
    children?: React.ReactNode;
};
export declare const UIPopover: React.ComponentType<PopoverProps>;
declare type RenderFunction = () => React.ReactNode;
export declare type TooltipProps = {
    title?: React.ReactNode | RenderFunction;
    getPopupContainer?: (triggerNode: Element) => HTMLElement;
    overlayClassName?: string;
    children?: React.ReactNode;
    placement?: TooltipPlacement;
    mouseLeaveDelay?: number;
    arrowPointAtCenter?: boolean;
    onVisibleChange?: (visible: boolean) => void;
};
export declare const UITooltip: React.ComponentType<TooltipProps>;
export declare type IconProps = {
    type: string;
    className?: string;
    onClick?: React.MouseEventHandler<any>;
};
export declare const UIIcon: React.ComponentType<IconProps>;
export declare type DropdownProps = {
    overlay: React.ReactNode;
    placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
    trigger?: ('click' | 'hover' | 'contextMenu')[];
    children?: React.ReactNode;
};
export declare const UIDropdown: (props: DropdownProps) => JSX.Element;
export declare type MenuProps = {
    children?: React.ReactNode;
};
export declare const UIMenu: (props: MenuProps) => JSX.Element;
export declare type MenuItemProps = {
    children?: React.ReactNode;
};
export declare const UIMenuItem: (props: MenuItemProps) => JSX.Element;
export declare type ButtonHTMLType = 'submit' | 'button' | 'reset';
export declare type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    htmlType?: ButtonHTMLType;
    icon?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
export declare const UIButton: (props: ButtonProps) => JSX.Element;
export declare type DividerProps = {
    className?: string;
    type?: 'vertical' | 'horizontal';
};
export declare const UIDivider: (props: DividerProps) => JSX.Element;
declare type Elements = {
    Popover: React.ComponentType<PopoverProps>;
    Tooltip: React.ComponentType<TooltipProps>;
    Icon: React.ComponentType<IconProps>;
    Dropdown: React.ComponentType<DropdownProps>;
    Menu: React.ComponentType<MenuProps>;
    MenuItem: React.ComponentType<MenuItemProps>;
    Button: React.ComponentType<ButtonProps>;
    Divider: React.ComponentType<DividerProps>;
};
/**
 * Allows for injecting custom UI elements that will be used. Mainly for styling and removing dependency on
 * any specific UI library but can also inject specific behaviour.
 */
declare const UIElementsContext: React.Context<Elements | undefined>;
export default UIElementsContext;
declare type GetElementsContextProps = {
    children: (elements: Elements) => React.ReactNode;
};
/**
 * Convenience render prop style component to handle error state when elements are not defined.
 */
export declare function GetElementsContext(props: GetElementsContextProps): JSX.Element;
