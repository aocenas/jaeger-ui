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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { css } from 'emotion';
import cx from 'classnames';
import { createStyle } from '../Theme';
const getStyles = createStyle(() => {
    return {
        flexRow: css `
      display: flex;
      flex: 0 1 auto;
      flex-direction: row;
    `,
    };
});
export default function TimelineRow(props) {
    const { children, className = '' } = props, rest = __rest(props, ["children", "className"]);
    const styles = getStyles();
    return (React.createElement("div", Object.assign({ className: cx(styles.flexRow, className) }, rest), children));
}
TimelineRow.defaultProps = {
    className: '',
};
export function TimelineRowCell(props) {
    const { children, className = '', width, style } = props, rest = __rest(props, ["children", "className", "width", "style"]);
    const widthPercent = `${width * 100}%`;
    const mergedStyle = Object.assign({}, style, { flexBasis: widthPercent, maxWidth: widthPercent });
    return (React.createElement("div", Object.assign({ className: `ub-relative ${className}`, style: mergedStyle }, rest), children));
}
TimelineRowCell.defaultProps = { className: '', style: {} };
TimelineRow.Cell = TimelineRowCell;
