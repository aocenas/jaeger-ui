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
import _groupBy from 'lodash/groupBy';
import { onlyUpdateForKeys, compose, withState, withProps } from 'recompose';
import { css } from 'emotion';
import cx from 'classnames';
import AccordianLogs from './SpanDetail/AccordianLogs';
import { UIPopover } from '../uiElementsContext';
import { createStyle } from '../Theme';
const getStyles = createStyle(() => {
    return {
        wrapper: css `
      label: wrapper;
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      overflow: hidden;
      z-index: 0;
    `,
        bar: css `
      label: bar;
      border-radius: 3px;
      min-width: 2px;
      position: absolute;
      height: 36%;
      top: 32%;
    `,
        rpc: css `
      label: rpc;
      position: absolute;
      top: 35%;
      bottom: 35%;
      z-index: 1;
    `,
        label: css `
      label: label;
      color: #aaa;
      font-size: 12px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1em;
      white-space: nowrap;
      padding: 0 0.5em;
      position: absolute;
    `,
        logMarker: css `
      label: logMarker;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      height: 60%;
      min-width: 1px;
      position: absolute;
      top: 20%;
      &:hover {
        background-color: #000;
      }
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        border: 1px solid transparent;
      }
      &::after {
        left: 0;
      }
    `,
        logHint: css `
      label: logHint;
      pointer-events: none;
      // TODO won't work with different UI elements injected
      & .ant-popover-inner-content {
        padding: 0.25rem;
      }
    `,
    };
});
function toPercent(value) {
    return `${(value * 100).toFixed(1)}%`;
}
function SpanBar(props) {
    const { viewEnd, viewStart, getViewedBounds, color, label, onClick, setLongLabel, setShortLabel, rpc, traceStartTime, span, className, labelClassName, } = props;
    // group logs based on timestamps
    const logGroups = _groupBy(span.logs, log => {
        const posPercent = getViewedBounds(log.timestamp, log.timestamp).start;
        // round to the nearest 0.2%
        return toPercent(Math.round(posPercent * 500) / 500);
    });
    const styles = getStyles();
    return (React.createElement("div", { className: cx(styles.wrapper, className), onClick: onClick, onMouseOut: setShortLabel, onMouseOver: setLongLabel, "aria-hidden": true, "data-test-id": "SpanBar--wrapper" },
        React.createElement("div", { "aria-label": label, className: styles.bar, style: {
                background: color,
                left: toPercent(viewStart),
                width: toPercent(viewEnd - viewStart),
            } },
            React.createElement("div", { className: cx(styles.label, labelClassName), "data-test-id": "SpanBar--label" }, label)),
        React.createElement("div", null, Object.keys(logGroups).map(positionKey => (React.createElement(UIPopover, { key: positionKey, arrowPointAtCenter: true, overlayClassName: styles.logHint, placement: "topLeft", content: React.createElement(AccordianLogs, { interactive: false, isOpen: true, logs: logGroups[positionKey], timestamp: traceStartTime }) },
            React.createElement("div", { className: styles.logMarker, style: { left: positionKey } }))))),
        rpc && (React.createElement("div", { className: styles.rpc, style: {
                background: rpc.color,
                left: toPercent(rpc.viewStart),
                width: toPercent(rpc.viewEnd - rpc.viewStart),
            } }))));
}
export default compose(withState('label', 'setLabel', (props) => props.shortLabel), withProps(({ setLabel, shortLabel, longLabel, }) => ({
    setLongLabel: () => setLabel(longLabel),
    setShortLabel: () => setLabel(shortLabel),
})), onlyUpdateForKeys(['label', 'rpc', 'viewStart', 'viewEnd']))(SpanBar);