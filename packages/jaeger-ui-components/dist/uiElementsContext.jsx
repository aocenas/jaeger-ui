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
    return (<GetElementsContext>
      {(elements) => {
        return <elements.Popover {...props}/>;
    }}
    </GetElementsContext>);
};
export const UITooltip = function UITooltip(props) {
    return (<GetElementsContext>
      {(elements) => {
        return <elements.Tooltip {...props}/>;
    }}
    </GetElementsContext>);
};
export const UIIcon = function UIIcon(props) {
    return (<GetElementsContext>
      {(elements) => {
        return <elements.Icon {...props}/>;
    }}
    </GetElementsContext>);
};
export const UIDropdown = function UIDropdown(props) {
    return (<GetElementsContext>
      {(elements) => {
        return <elements.Dropdown {...props}/>;
    }}
    </GetElementsContext>);
};
export const UIMenu = function UIMenu(props) {
    return (<GetElementsContext>
      {(elements) => {
        return <elements.Menu {...props}/>;
    }}
    </GetElementsContext>);
};
export const UIMenuItem = function UIMenuItem(props) {
    return (<GetElementsContext>
      {(elements) => {
        return <elements.MenuItem {...props}/>;
    }}
    </GetElementsContext>);
};
export const UIButton = function UIButton(props) {
    return (<GetElementsContext>
      {(elements) => {
        return <elements.Button {...props}/>;
    }}
    </GetElementsContext>);
};
export const UIDivider = function UIDivider(props) {
    return (<GetElementsContext>
      {(elements) => {
        return <elements.Divider {...props}/>;
    }}
    </GetElementsContext>);
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
    return (<UIElementsContext.Consumer>
      {(value) => {
        if (!value) {
            throw new Error('Elements context is required. You probably forget to use UIElementsContext.Provider');
        }
        return props.children(value);
    }}
    </UIElementsContext.Consumer>);
}
