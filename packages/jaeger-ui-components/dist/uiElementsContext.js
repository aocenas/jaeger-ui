// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import React from 'react';
export const UIPopover = function UIPopover(props) {
    return (React.createElement(GetElementsContext, null, (elements) => {
        return React.createElement(elements.Popover, Object.assign({}, props));
    }));
};
export const UITooltip = function UITooltip(props) {
    return (React.createElement(GetElementsContext, null, (elements) => {
        return React.createElement(elements.Tooltip, Object.assign({}, props));
    }));
};
export const UIIcon = function UIIcon(props) {
    return (React.createElement(GetElementsContext, null, (elements) => {
        return React.createElement(elements.Icon, Object.assign({}, props));
    }));
};
export const UIDropdown = function UIDropdown(props) {
    return (React.createElement(GetElementsContext, null, (elements) => {
        return React.createElement(elements.Dropdown, Object.assign({}, props));
    }));
};
export const UIMenu = function UIMenu(props) {
    return (React.createElement(GetElementsContext, null, (elements) => {
        return React.createElement(elements.Menu, Object.assign({}, props));
    }));
};
export const UIMenuItem = function UIMenuItem(props) {
    return (React.createElement(GetElementsContext, null, (elements) => {
        return React.createElement(elements.MenuItem, Object.assign({}, props));
    }));
};
export const UIButton = function UIButton(props) {
    return (React.createElement(GetElementsContext, null, (elements) => {
        return React.createElement(elements.Button, Object.assign({}, props));
    }));
};
export const UIDivider = function UIDivider(props) {
    return (React.createElement(GetElementsContext, null, (elements) => {
        return React.createElement(elements.Divider, Object.assign({}, props));
    }));
};
/**
 * Allows for injecting custom UI elements that will be used. Mainly for styling and removing dependency on
 * any specific UI library but can also inject specific behaviour.
 */
const UIElementsContext = React.createContext(undefined);
UIElementsContext.displayName = 'UIElementsContext';
export default UIElementsContext;
/**
 * Convenience render prop style component to handle error state when elements are not defined.
 */
export function GetElementsContext(props) {
    return (React.createElement(UIElementsContext.Consumer, null, (value) => {
        if (!value) {
            throw new Error('Elements context is required. You probably forget to use UIElementsContext.Provider');
        }
        return props.children(value);
    }));
}
