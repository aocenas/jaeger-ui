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
import { css } from 'emotion';
import cx from 'classnames';
import { UITooltip, UIIcon } from '../../uiElementsContext';
import { createStyle } from '../../Theme';
const getStyles = createStyle(() => {
    return {
        TraceTimelineViewer: css `
      border-bottom: 1px solid #bbb;
    `,
        TimelineCollapser: css `
      align-items: center;
      display: flex;
      flex: none;
      justify-content: center;
      margin-right: 0.5rem;
    `,
        tooltipTitle: css `
      white-space: pre;
    `,
        btn: css `
      color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      margin-right: 0.3rem;
      padding: 0.1rem;
      &:hover {
        color: rgba(0, 0, 0, 0.85);
      }
    `,
        btnExpanded: css `
      transform: rotate(90deg);
    `,
    };
});
function getTitle(value) {
    const styles = getStyles();
    return React.createElement("span", { className: styles.tooltipTitle }, value);
}
export default class TimelineCollapser extends React.PureComponent {
    constructor(props) {
        super(props);
        // TODO: Something less hacky than createElement to help TypeScript / AntD
        this.getContainer = () => this.containerRef.current || document.createElement('div');
        this.containerRef = React.createRef();
    }
    render() {
        const { onExpandAll, onExpandOne, onCollapseAll, onCollapseOne } = this.props;
        const styles = getStyles();
        return (React.createElement("div", { className: styles.TimelineCollapser, ref: this.containerRef, "data-test-id": "TimelineCollapser" },
            React.createElement(UITooltip, { title: getTitle('Expand +1'), getPopupContainer: this.getContainer },
                React.createElement(UIIcon, { type: "right", onClick: onExpandOne, className: cx(styles.btn, styles.btnExpanded) })),
            React.createElement(UITooltip, { title: getTitle('Collapse +1'), getPopupContainer: this.getContainer },
                React.createElement(UIIcon, { type: "right", onClick: onCollapseOne, className: styles.btn })),
            React.createElement(UITooltip, { title: getTitle('Expand All'), getPopupContainer: this.getContainer },
                React.createElement(UIIcon, { type: "double-right", onClick: onExpandAll, className: cx(styles.btn, styles.btnExpanded) })),
            React.createElement(UITooltip, { title: getTitle('Collapse All'), getPopupContainer: this.getContainer },
                React.createElement(UIIcon, { type: "double-right", onClick: onCollapseAll, className: styles.btn }))));
    }
}
