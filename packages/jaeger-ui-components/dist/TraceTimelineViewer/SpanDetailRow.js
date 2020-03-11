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
import SpanDetail from './SpanDetail';
import SpanTreeOffset from './SpanTreeOffset';
import TimelineRow from './TimelineRow';
import { createStyle } from '../Theme';
const getStyles = createStyle(() => {
    return {
        expandedAccent: css `
      cursor: pointer;
      height: 100%;
      overflow: hidden;
      position: absolute;
      width: 100%;
      &::before {
        border-left: 4px solid;
        pointer-events: none;
        width: 1000px;
      }
      &::after {
        border-right: 1000px solid;
        border-color: inherit;
        cursor: pointer;
        opacity: 0.2;
      }

      /* border-color inherit must come AFTER other border declarations for accent */
      &::before,
      &::after {
        border-color: inherit;
        content: ' ';
        position: absolute;
        height: 100%;
      }

      &:hover::after {
        opacity: 0.35;
      }
    `,
        infoWrapper: css `
      background: #f5f5f5;
      border: 1px solid #d3d3d3;
      border-top: 3px solid;
      padding: 0.75rem;
    `,
    };
});
export default class SpanDetailRow extends React.PureComponent {
    constructor() {
        super(...arguments);
        this._detailToggle = () => {
            this.props.onDetailToggled(this.props.span.spanID);
        };
        this._linksGetter = (items, itemIndex) => {
            const { linksGetter, span } = this.props;
            return linksGetter(span, items, itemIndex);
        };
    }
    render() {
        const { color, columnDivision, detailState, logItemToggle, logsToggle, processToggle, referencesToggle, warningsToggle, span, tagsToggle, traceStartTime, focusSpan, hoverIndentGuideIds, addHoverIndentGuideId, removeHoverIndentGuideId, } = this.props;
        const styles = getStyles();
        return (React.createElement(TimelineRow, null,
            React.createElement(TimelineRow.Cell, { width: columnDivision },
                React.createElement(SpanTreeOffset, { span: span, showChildrenIcon: false, hoverIndentGuideIds: hoverIndentGuideIds, addHoverIndentGuideId: addHoverIndentGuideId, removeHoverIndentGuideId: removeHoverIndentGuideId }),
                React.createElement("span", null,
                    React.createElement("span", { className: styles.expandedAccent, "aria-checked": "true", onClick: this._detailToggle, role: "switch", style: { borderColor: color }, "data-test-id": "detail-row-expanded-accent" }))),
            React.createElement(TimelineRow.Cell, { width: 1 - columnDivision },
                React.createElement("div", { className: styles.infoWrapper, style: { borderTopColor: color } },
                    React.createElement(SpanDetail, { detailState: detailState, linksGetter: this._linksGetter, logItemToggle: logItemToggle, logsToggle: logsToggle, processToggle: processToggle, referencesToggle: referencesToggle, warningsToggle: warningsToggle, span: span, tagsToggle: tagsToggle, traceStartTime: traceStartTime, focusSpan: focusSpan })))));
    }
}
