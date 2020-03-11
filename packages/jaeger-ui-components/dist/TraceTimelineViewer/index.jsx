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
import React from 'react';
import { css } from 'emotion';
import TimelineHeaderRow from './TimelineHeaderRow';
import VirtualizedTraceView from './VirtualizedTraceView';
import { merge as mergeShortcuts } from '../keyboard-shortcuts';
import { createStyle } from '../Theme';
import ExternalLinkContext from '../url/externalLinkContext';
const getStyles = createStyle(() => {
    return {
        TraceTimelineViewer: css `
      border-bottom: 1px solid #bbb;

      & .json-markup {
        line-height: 17px;
        font-size: 13px;
        font-family: monospace;
        white-space: pre-wrap;
      }

      & .json-markup-key {
        font-weight: bold;
      }

      & .json-markup-bool {
        color: firebrick;
      }

      & .json-markup-string {
        color: teal;
      }

      & .json-markup-null {
        color: teal;
      }

      & .json-markup-number {
        color: blue;
      }
    `,
    };
});
const NUM_TICKS = 5;
/**
 * `TraceTimelineViewer` now renders the header row because it is sensitive to
 * `props.viewRange.time.cursor`. If `VirtualizedTraceView` renders it, it will
 * re-render the ListView every time the cursor is moved on the trace minimap
 * or `TimelineHeaderRow`.
 */
export default class TraceTimelineViewer extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.collapseAll = () => {
            this.props.collapseAll(this.props.trace.spans);
        };
        this.collapseOne = () => {
            this.props.collapseOne(this.props.trace.spans);
        };
        this.expandAll = () => {
            this.props.expandAll();
        };
        this.expandOne = () => {
            this.props.expandOne(this.props.trace.spans);
        };
    }
    componentDidMount() {
        mergeShortcuts({
            collapseAll: this.collapseAll,
            expandAll: this.expandAll,
            collapseOne: this.collapseOne,
            expandOne: this.expandOne,
        });
    }
    render() {
        const _a = this.props, { setSpanNameColumnWidth, updateNextViewRangeTime, updateViewRangeTime, viewRange, createLinkToExternalSpan, traceTimeline } = _a, rest = __rest(_a, ["setSpanNameColumnWidth", "updateNextViewRangeTime", "updateViewRangeTime", "viewRange", "createLinkToExternalSpan", "traceTimeline"]);
        const { trace } = rest;
        const styles = getStyles();
        return (<ExternalLinkContext.Provider value={createLinkToExternalSpan}>
        <div className={styles.TraceTimelineViewer}>
          <TimelineHeaderRow duration={trace.duration} nameColumnWidth={traceTimeline.spanNameColumnWidth} numTicks={NUM_TICKS} onCollapseAll={this.collapseAll} onCollapseOne={this.collapseOne} onColummWidthChange={setSpanNameColumnWidth} onExpandAll={this.expandAll} onExpandOne={this.expandOne} viewRangeTime={viewRange.time} updateNextViewRangeTime={updateNextViewRangeTime} updateViewRangeTime={updateViewRangeTime}/>
          <VirtualizedTraceView {...rest} {...traceTimeline} setSpanNameColumnWidth={setSpanNameColumnWidth} currentViewRangeTime={viewRange.time.current}/>
        </div>
      </ExternalLinkContext.Provider>);
    }
}
