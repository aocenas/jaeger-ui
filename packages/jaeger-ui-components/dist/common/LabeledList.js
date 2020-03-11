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
import { css } from 'emotion';
import cx from 'classnames';
import { createStyle } from '../Theme';
import { UIDivider } from '../uiElementsContext';
const getStyles = createStyle(() => {
    return {
        LabeledList: css `
      label: LabeledList;
      list-style: none;
      margin: 0;
      padding: 0;
    `,
        LabeledListItem: css `
      label: LabeledListItem;
      display: inline-block;
    `,
        LabeledListLabel: css `
      label: LabeledListLabel;
      color: #999;
      margin-right: 0.25rem;
    `,
    };
});
export default function LabeledList(props) {
    const { className, dividerClassName, items } = props;
    const styles = getStyles();
    return (React.createElement("ul", { className: cx(styles.LabeledList, className) }, items.map(({ key, label, value }, i) => {
        const divider = i < items.length - 1 && (React.createElement("li", { className: styles.LabeledListItem, key: `${key}--divider` },
            React.createElement(UIDivider, { className: dividerClassName, type: "vertical" })));
        return [
            React.createElement("li", { className: styles.LabeledListItem, key: key },
                React.createElement("span", { className: styles.LabeledListLabel }, label),
                React.createElement("strong", null, value)),
            divider,
        ];
    })));
}