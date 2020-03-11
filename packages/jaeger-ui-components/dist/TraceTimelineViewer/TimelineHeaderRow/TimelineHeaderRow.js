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
import TimelineCollapser from './TimelineCollapser';
import TimelineColumnResizer from './TimelineColumnResizer';
import TimelineViewingLayer from './TimelineViewingLayer';
import Ticks from '../Ticks';
import TimelineRow from '../TimelineRow';
import { createStyle } from '../../Theme';
const getStyles = createStyle(() => {
    return {
        TimelineHeaderRow: css `
      background: #ececec;
      border-bottom: 1px solid #ccc;
      height: 38px;
      line-height: 38px;
      position: fixed;
      width: 100%;
      z-index: 4;
    `,
        title: css `
      flex: 1;
      overflow: hidden;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,
    };
});
export default function TimelineHeaderRow(props) {
    const { duration, nameColumnWidth, numTicks, onCollapseAll, onCollapseOne, onColummWidthChange, onExpandAll, onExpandOne, updateViewRangeTime, updateNextViewRangeTime, viewRangeTime, } = props;
    const [viewStart, viewEnd] = viewRangeTime.current;
    const styles = getStyles();
    return (React.createElement(TimelineRow, { className: styles.TimelineHeaderRow, "data-test-id": "TimelineHeaderRow" },
        React.createElement(TimelineRow.Cell, { className: "ub-flex ub-px2", width: nameColumnWidth },
            React.createElement("h3", { className: styles.TimelineHeaderRow }, "Service & Operation"),
            React.createElement(TimelineCollapser, { onCollapseAll: onCollapseAll, onExpandAll: onExpandAll, onCollapseOne: onCollapseOne, onExpandOne: onExpandOne })),
        React.createElement(TimelineRow.Cell, { width: 1 - nameColumnWidth },
            React.createElement(TimelineViewingLayer, { boundsInvalidator: nameColumnWidth, updateNextViewRangeTime: updateNextViewRangeTime, updateViewRangeTime: updateViewRangeTime, viewRangeTime: viewRangeTime }),
            React.createElement(Ticks, { numTicks: numTicks, startTime: viewStart * duration, endTime: viewEnd * duration, showLabels: true })),
        React.createElement(TimelineColumnResizer, { position: nameColumnWidth, onChange: onColummWidthChange, min: 0.15, max: 0.85 })));
}
