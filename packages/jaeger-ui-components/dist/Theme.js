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
import hoistNonReactStatics from 'hoist-non-react-statics';
import memoizeOne from 'memoize-one';
export const defaultTheme = {
    borderStyle: '1px solid #bbb',
};
const ThemeContext = React.createContext(undefined);
ThemeContext.displayName = 'ThemeContext';
export const ThemeProvider = ThemeContext.Provider;
export function ThemeConsumer(props) {
    return (React.createElement(ThemeContext.Consumer, null, (value) => {
        const mergedTheme = value
            ? Object.assign({}, defaultTheme, value) : defaultTheme;
        return props.children(mergedTheme);
    }));
}
export const withTheme = (Component) => {
    let WithTheme = props => {
        return (React.createElement(ThemeConsumer, null, (theme) => (React.createElement(Component, Object.assign({}, Object.assign({}, props, { theme }))))));
    };
    WithTheme.displayName = `WithTheme(${Component.displayName})`;
    WithTheme = hoistNonReactStatics(WithTheme, Component);
    WithTheme.wrapped = Component;
    return WithTheme;
};
export const createStyle = (fn) => {
    return memoizeOne(fn);
};
