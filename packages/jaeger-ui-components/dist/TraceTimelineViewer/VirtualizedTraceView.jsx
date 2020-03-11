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
import ListView from './ListView';
import SpanBarRow from './SpanBarRow';
import SpanDetailRow from './SpanDetailRow';
import { createViewedBoundsFunc, findServerChildSpan, isErrorSpan, spanContainsErredSpan, } from './utils';
import colorGenerator from '../utils/color-generator';
import './VirtualizedTraceView.css';
import { createStyle } from '../Theme';
const getStyles = createStyle(() => {
    return {
        spans: css `
      padding-top: 38px;
    `,
        rowsWrapper: css `
      width: 100%;
    `,
        row: css `
      width: 100%;
    `,
    };
});
// export for tests
export const DEFAULT_HEIGHTS = {
    bar: 28,
    detail: 161,
    detailWithLogs: 197,
};
const NUM_TICKS = 5;
function generateRowStates(spans, childrenHiddenIDs, detailStates) {
    if (!spans) {
        return [];
    }
    let collapseDepth = null;
    const rowStates = [];
    for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        const { spanID, depth } = span;
        let hidden = false;
        if (collapseDepth != null) {
            if (depth >= collapseDepth) {
                hidden = true;
            }
            else {
                collapseDepth = null;
            }
        }
        if (hidden) {
            continue;
        }
        if (childrenHiddenIDs.has(spanID)) {
            collapseDepth = depth + 1;
        }
        rowStates.push({
            span,
            isDetail: false,
            spanIndex: i,
        });
        if (detailStates.has(spanID)) {
            rowStates.push({
                span,
                isDetail: true,
                spanIndex: i,
            });
        }
    }
    return rowStates;
}
function getClipping(currentViewRange) {
    const [zoomStart, zoomEnd] = currentViewRange;
    return {
        left: zoomStart > 0,
        right: zoomEnd < 1,
    };
}
// export from tests
export default class VirtualizedTraceView extends React.Component {
    constructor(props) {
        super(props);
        this.getViewRange = () => this.props.currentViewRangeTime;
        this.getSearchedSpanIDs = () => this.props.findMatchesIDs;
        this.getCollapsedChildren = () => this.props.childrenHiddenIDs;
        this.mapRowIndexToSpanIndex = (index) => this.rowStates[index].spanIndex;
        this.mapSpanIndexToRowIndex = (index) => {
            const max = this.rowStates.length;
            for (let i = 0; i < max; i++) {
                const { spanIndex } = this.rowStates[i];
                if (spanIndex === index) {
                    return i;
                }
            }
            throw new Error(`unable to find row for span index: ${index}`);
        };
        this.setListView = (listView) => {
            const isChanged = this.listView !== listView;
            this.listView = listView;
            if (listView && isChanged) {
                this.props.registerAccessors(this.getAccessors());
            }
        };
        // use long form syntax to avert flow error
        // https://github.com/facebook/flow/issues/3076#issuecomment-290944051
        this.getKeyFromIndex = (index) => {
            const { isDetail, span } = this.rowStates[index];
            return `${span.spanID}--${isDetail ? 'detail' : 'bar'}`;
        };
        this.getIndexFromKey = (key) => {
            const parts = key.split('--');
            const _spanID = parts[0];
            const _isDetail = parts[1] === 'detail';
            const max = this.rowStates.length;
            for (let i = 0; i < max; i++) {
                const { span, isDetail } = this.rowStates[i];
                if (span.spanID === _spanID && isDetail === _isDetail) {
                    return i;
                }
            }
            return -1;
        };
        this.getRowHeight = (index) => {
            const { span, isDetail } = this.rowStates[index];
            if (!isDetail) {
                return DEFAULT_HEIGHTS.bar;
            }
            if (Array.isArray(span.logs) && span.logs.length) {
                return DEFAULT_HEIGHTS.detailWithLogs;
            }
            return DEFAULT_HEIGHTS.detail;
        };
        this.renderRow = (key, style, index, attrs) => {
            const { isDetail, span, spanIndex } = this.rowStates[index];
            return isDetail
                ? this.renderSpanDetailRow(span, key, style, attrs)
                : this.renderSpanBarRow(span, spanIndex, key, style, attrs);
        };
        // keep "prop derivations" on the instance instead of calculating in
        // `.render()` to avoid recalculating in every invocation of `.renderRow()`
        const { currentViewRangeTime, childrenHiddenIDs, detailStates, setTrace, trace, uiFind } = props;
        this.clipping = getClipping(currentViewRangeTime);
        const [zoomStart, zoomEnd] = currentViewRangeTime;
        this.getViewedBounds = createViewedBoundsFunc({
            min: trace.startTime,
            max: trace.endTime,
            viewStart: zoomStart,
            viewEnd: zoomEnd,
        });
        this.rowStates = generateRowStates(trace.spans, childrenHiddenIDs, detailStates);
        setTrace(trace, uiFind);
    }
    shouldComponentUpdate(nextProps) {
        // If any prop updates, VirtualizedTraceViewImpl should update.
        const nextPropKeys = Object.keys(nextProps);
        for (let i = 0; i < nextPropKeys.length; i += 1) {
            if (nextProps[nextPropKeys[i]] !== this.props[nextPropKeys[i]]) {
                // Unless the only change was props.shouldScrollToFirstUiFindMatch changing to false.
                if (nextPropKeys[i] === 'shouldScrollToFirstUiFindMatch') {
                    if (nextProps[nextPropKeys[i]])
                        return true;
                }
                else {
                    return true;
                }
            }
        }
        return false;
    }
    componentWillUpdate(nextProps) {
        const { childrenHiddenIDs, detailStates, registerAccessors, trace, currentViewRangeTime } = this.props;
        const { currentViewRangeTime: nextViewRangeTime, childrenHiddenIDs: nextHiddenIDs, detailStates: nextDetailStates, registerAccessors: nextRegisterAccessors, setTrace, trace: nextTrace, uiFind, } = nextProps;
        if (trace !== nextTrace) {
            setTrace(nextTrace, uiFind);
        }
        if (trace !== nextTrace || childrenHiddenIDs !== nextHiddenIDs || detailStates !== nextDetailStates) {
            this.rowStates = nextTrace ? generateRowStates(nextTrace.spans, nextHiddenIDs, nextDetailStates) : [];
        }
        if (currentViewRangeTime !== nextViewRangeTime) {
            this.clipping = getClipping(nextViewRangeTime);
            const [zoomStart, zoomEnd] = nextViewRangeTime;
            this.getViewedBounds = createViewedBoundsFunc({
                min: trace.startTime,
                max: trace.endTime,
                viewStart: zoomStart,
                viewEnd: zoomEnd,
            });
        }
        if (this.listView && registerAccessors !== nextRegisterAccessors) {
            nextRegisterAccessors(this.getAccessors());
        }
    }
    componentDidUpdate() {
        const { shouldScrollToFirstUiFindMatch, clearShouldScrollToFirstUiFindMatch, scrollToFirstVisibleSpan, } = this.props;
        if (shouldScrollToFirstUiFindMatch) {
            scrollToFirstVisibleSpan();
            clearShouldScrollToFirstUiFindMatch();
        }
    }
    getAccessors() {
        const lv = this.listView;
        if (!lv) {
            throw new Error('ListView unavailable');
        }
        return {
            getViewRange: this.getViewRange,
            getSearchedSpanIDs: this.getSearchedSpanIDs,
            getCollapsedChildren: this.getCollapsedChildren,
            getViewHeight: lv.getViewHeight,
            getBottomRowIndexVisible: lv.getBottomVisibleIndex,
            getTopRowIndexVisible: lv.getTopVisibleIndex,
            getRowPosition: lv.getRowPosition,
            mapRowIndexToSpanIndex: this.mapRowIndexToSpanIndex,
            mapSpanIndexToRowIndex: this.mapSpanIndexToRowIndex,
        };
    }
    renderSpanBarRow(span, spanIndex, key, style, attrs) {
        const { spanID } = span;
        const { serviceName } = span.process;
        const { childrenHiddenIDs, childrenToggle, detailStates, detailToggle, findMatchesIDs, spanNameColumnWidth, trace, focusSpan, hoverIndentGuideIds, addHoverIndentGuideId, removeHoverIndentGuideId, } = this.props;
        // to avert flow error
        if (!trace) {
            return null;
        }
        const color = colorGenerator.getColorByKey(serviceName);
        const isCollapsed = childrenHiddenIDs.has(spanID);
        const isDetailExpanded = detailStates.has(spanID);
        const isMatchingFilter = findMatchesIDs ? findMatchesIDs.has(spanID) : false;
        const showErrorIcon = isErrorSpan(span) || (isCollapsed && spanContainsErredSpan(trace.spans, spanIndex));
        // Check for direct child "server" span if the span is a "client" span.
        let rpc = null;
        if (isCollapsed) {
            const rpcSpan = findServerChildSpan(trace.spans.slice(spanIndex));
            if (rpcSpan) {
                const rpcViewBounds = this.getViewedBounds(rpcSpan.startTime, rpcSpan.startTime + rpcSpan.duration);
                rpc = {
                    color: colorGenerator.getColorByKey(rpcSpan.process.serviceName),
                    operationName: rpcSpan.operationName,
                    serviceName: rpcSpan.process.serviceName,
                    viewEnd: rpcViewBounds.end,
                    viewStart: rpcViewBounds.start,
                };
            }
        }
        const styles = getStyles();
        return (<div className={styles.row} key={key} style={style} {...attrs}>
        <SpanBarRow clippingLeft={this.clipping.left} clippingRight={this.clipping.right} color={color} columnDivision={spanNameColumnWidth} isChildrenExpanded={!isCollapsed} isDetailExpanded={isDetailExpanded} isMatchingFilter={isMatchingFilter} numTicks={NUM_TICKS} onDetailToggled={detailToggle} onChildrenToggled={childrenToggle} rpc={rpc} showErrorIcon={showErrorIcon} getViewedBounds={this.getViewedBounds} traceStartTime={trace.startTime} span={span} focusSpan={focusSpan} hoverIndentGuideIds={hoverIndentGuideIds} addHoverIndentGuideId={addHoverIndentGuideId} removeHoverIndentGuideId={removeHoverIndentGuideId}/>
      </div>);
    }
    renderSpanDetailRow(span, key, style, attrs) {
        const { spanID } = span;
        const { serviceName } = span.process;
        const { detailLogItemToggle, detailLogsToggle, detailProcessToggle, detailReferencesToggle, detailWarningsToggle, detailStates, detailTagsToggle, detailToggle, spanNameColumnWidth, trace, focusSpan, hoverIndentGuideIds, addHoverIndentGuideId, removeHoverIndentGuideId, linksGetter, } = this.props;
        const detailState = detailStates.get(spanID);
        if (!trace || !detailState) {
            return null;
        }
        const color = colorGenerator.getColorByKey(serviceName);
        const styles = getStyles();
        return (<div className={styles.row} key={key} style={Object.assign({}, style, { zIndex: 1 })} {...attrs}>
        <SpanDetailRow color={color} columnDivision={spanNameColumnWidth} onDetailToggled={detailToggle} detailState={detailState} linksGetter={linksGetter} logItemToggle={detailLogItemToggle} logsToggle={detailLogsToggle} processToggle={detailProcessToggle} referencesToggle={detailReferencesToggle} warningsToggle={detailWarningsToggle} span={span} tagsToggle={detailTagsToggle} traceStartTime={trace.startTime} focusSpan={focusSpan} hoverIndentGuideIds={hoverIndentGuideIds} addHoverIndentGuideId={addHoverIndentGuideId} removeHoverIndentGuideId={removeHoverIndentGuideId}/>
      </div>);
    }
    render() {
        const styles = getStyles();
        return (<div className={styles.spans}>
        <ListView ref={this.setListView} dataLength={this.rowStates.length} itemHeightGetter={this.getRowHeight} itemRenderer={this.renderRow} viewBuffer={300} viewBufferMin={100} itemsWrapperClassName={styles.rowsWrapper} getKeyFromIndex={this.getKeyFromIndex} getIndexFromKey={this.getIndexFromKey} windowScroller/>
      </div>);
    }
}
