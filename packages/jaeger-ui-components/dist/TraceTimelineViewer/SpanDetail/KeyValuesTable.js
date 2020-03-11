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
import jsonMarkup from 'json-markup';
import { css } from 'emotion';
import cx from 'classnames';
import CopyIcon from '../../common/CopyIcon';
import { UIDropdown, UIIcon, UIMenu, UIMenuItem } from '../../uiElementsContext';
import { createStyle } from '../../Theme';
export const getStyles = createStyle(() => {
    const copyIcon = css `
    label: copyIcon;
  `;
    return {
        KeyValueTable: css `
      label: KeyValueTable;
      background: #fff;
      border: 1px solid #ddd;
      margin-bottom: 0.7em;
      max-height: 450px;
      overflow: auto;
    `,
        body: css `
      label: body;
      vertical-align: baseline;
    `,
        row: css `
      label: row;
      & > td {
        padding: 0.25rem 0.5rem;
        padding: 0.25rem 0.5rem;
        vertical-align: top;
      }
      &:nth-child(2n) > td {
        background: #f5f5f5;
      }
      &:not(:hover) .${copyIcon} {
        display: none;
      }
    `,
        keyColumn: css `
      label: keyColumn;
      color: #888;
      white-space: pre;
      width: 125px;
    `,
        copyColumn: css `
      label: copyColumn;
      text-align: right;
    `,
        linkIcon: css `
      label: linkIcon;
      vertical-align: middle;
      font-weight: bold;
    `,
        copyIcon,
    };
});
const jsonObjectOrArrayStartRegex = /^(\[|\{)/;
function parseIfComplexJson(value) {
    // if the value is a string representing actual json object or array, then use json-markup
    if (typeof value === 'string' && jsonObjectOrArrayStartRegex.test(value)) {
        // otherwise just return as is
        try {
            return JSON.parse(value);
            // eslint-disable-next-line no-empty
        }
        catch (_) { }
    }
    return value;
}
export const LinkValue = (props) => {
    const styles = getStyles();
    return (React.createElement("a", { href: props.href, title: props.title, target: "_blank", rel: "noopener noreferrer" },
        props.children,
        " ",
        React.createElement(UIIcon, { className: styles.linkIcon, type: "export" })));
};
LinkValue.defaultProps = {
    title: '',
};
const linkValueList = (links) => (React.createElement(UIMenu, null, links.map(({ text, url }, index) => (
// `index` is necessary in the key because url can repeat
// eslint-disable-next-line react/no-array-index-key
React.createElement(UIMenuItem, { key: `${url}-${index}` },
    React.createElement(LinkValue, { href: url }, text))))));
export default function KeyValuesTable(props) {
    const { data, linksGetter } = props;
    const styles = getStyles();
    return (React.createElement("div", { className: cx(styles.KeyValueTable, 'u-simple-scrollbars'), "data-test-id": "KeyValueTable" },
        React.createElement("table", { className: "u-width-100" },
            React.createElement("tbody", { className: styles.body }, data.map((row, i) => {
                const markup = {
                    __html: jsonMarkup(parseIfComplexJson(row.value)),
                };
                // eslint-disable-next-line react/no-danger
                const jsonTable = React.createElement("div", { className: "ub-inline-block", dangerouslySetInnerHTML: markup });
                const links = linksGetter ? linksGetter(data, i) : null;
                let valueMarkup;
                if (links && links.length === 1) {
                    valueMarkup = (React.createElement("div", null,
                        React.createElement(LinkValue, { href: links[0].url, title: links[0].text }, jsonTable)));
                }
                else if (links && links.length > 1) {
                    valueMarkup = (React.createElement("div", null,
                        React.createElement(UIDropdown, { overlay: linkValueList(links), placement: "bottomRight", trigger: ['click'] },
                            React.createElement("a", null,
                                jsonTable,
                                " ",
                                React.createElement(UIIcon, { className: styles.linkIcon, type: "profile" })))));
                }
                else {
                    valueMarkup = jsonTable;
                }
                return (
                // `i` is necessary in the key because row.key can repeat
                // eslint-disable-next-line react/no-array-index-key
                React.createElement("tr", { className: styles.row, key: `${row.key}-${i}` },
                    React.createElement("td", { className: styles.keyColumn, "data-test-id": "KeyValueTable--keyColumn" }, row.key),
                    React.createElement("td", null, valueMarkup),
                    React.createElement("td", { className: styles.copyColumn },
                        React.createElement(CopyIcon, { className: styles.copyIcon, copyText: JSON.stringify(row, null, 2), tooltipTitle: "Copy JSON" }))));
            })))));
}
