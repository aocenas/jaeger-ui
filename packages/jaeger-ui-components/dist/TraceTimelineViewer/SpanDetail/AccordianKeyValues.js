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
import * as React from 'react';
import IoIosArrowDown from 'react-icons/lib/io/ios-arrow-down';
import IoIosArrowRight from 'react-icons/lib/io/ios-arrow-right';
import { css } from 'emotion';
import cx from 'classnames';
import * as markers from './AccordianKeyValues.markers';
import KeyValuesTable from './KeyValuesTable';
import { createStyle } from '../../Theme';
export const getStyles = createStyle(() => {
    return {
        header: css `
      cursor: pointer;
      overflow: hidden;
      padding: 0.25em 0.1em;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background: #e8e8e8;
      }
    `,
        headerEmpty: css `
      background: none;
      cursor: initial;
    `,
        headerHighContrast: css `
      &:hover {
        background: #ddd;
      }
    `,
        emptyIcon: css `
      color: #aaa;
    `,
        summary: css `
      display: inline;
      list-style: none;
      padding: 0;
    `,
        summaryItem: css `
      display: inline;
      margin-left: 0.7em;
      padding-right: 0.5rem;
      border-right: 1px solid #ddd;
      &:last-child {
        padding-right: 0;
        border-right: none;
      }
    `,
        summaryLabel: css `
      color: #777;
    `,
        summaryDelim: css `
      color: #bbb;
      padding: 0 0.2em;
    `,
    };
});
// export for tests
export function KeyValuesSummary(props) {
    const { data } = props;
    if (!Array.isArray(data) || !data.length) {
        return null;
    }
    const styles = getStyles();
    return (React.createElement("ul", { className: styles.summary }, data.map((item, i) => (
    // `i` is necessary in the key because item.key can repeat
    // eslint-disable-next-line react/no-array-index-key
    React.createElement("li", { className: styles.summaryItem, key: `${item.key}-${i}` },
        React.createElement("span", { className: styles.summaryLabel }, item.key),
        React.createElement("span", { className: styles.summaryDelim }, "="),
        String(item.value))))));
}
KeyValuesSummary.defaultProps = {
    data: null,
};
export default function AccordianKeyValues(props) {
    const { className, data, highContrast, interactive, isOpen, label, linksGetter, onToggle } = props;
    const isEmpty = !Array.isArray(data) || !data.length;
    const styles = getStyles();
    const iconCls = cx('u-align-icon', { [styles.emptyIcon]: isEmpty });
    let arrow = null;
    let headerProps = null;
    if (interactive) {
        arrow = isOpen ? React.createElement(IoIosArrowDown, { className: iconCls }) : React.createElement(IoIosArrowRight, { className: iconCls });
        headerProps = {
            'aria-checked': isOpen,
            onClick: isEmpty ? null : onToggle,
            role: 'switch',
        };
    }
    return (React.createElement("div", { className: cx(className, 'u-tx-ellipsis') },
        React.createElement("div", Object.assign({ className: cx(styles.header, {
                [styles.headerEmpty]: isEmpty,
                [styles.headerHighContrast]: highContrast && !isEmpty,
            }) }, headerProps, { "data-test-id": "AccordianKeyValues--header" }),
            arrow,
            React.createElement("strong", { "data-test": markers.LABEL },
                label,
                isOpen || ':'),
            !isOpen && React.createElement(KeyValuesSummary, { data: data })),
        isOpen && React.createElement(KeyValuesTable, { data: data, linksGetter: linksGetter })));
}
AccordianKeyValues.defaultProps = {
    className: null,
    highContrast: false,
    interactive: true,
    onToggle: null,
};
