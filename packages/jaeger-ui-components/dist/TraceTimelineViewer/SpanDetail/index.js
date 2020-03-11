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
import AccordianKeyValues from './AccordianKeyValues';
import AccordianLogs from './AccordianLogs';
import AccordianText from './AccordianText';
import { formatDuration } from '../utils';
import CopyIcon from '../../common/CopyIcon';
import LabeledList from '../../common/LabeledList';
import AccordianReferences from './AccordianReferences';
import { createStyle } from '../../Theme';
import { UIDivider } from '../../uiElementsContext';
const getStyles = createStyle(() => {
    return {
        divider: css `
      background: #ddd;
    `,
        debugInfo: css `
      display: block;
      letter-spacing: 0.25px;
      margin: 0.5em 0 -0.75em;
      text-align: right;
    `,
        debugLabel: css `
      &::before {
        color: #bbb;
        content: attr(data-label);
      }
    `,
        debugValue: css `
      background-color: inherit;
      border: none;
      color: #888;
      cursor: pointer;
      &:hover {
        color: #333;
      }
    `,
        AccordianWarnings: css `
      background: #fafafa;
      border: 1px solid #e4e4e4;
      margin-bottom: 0.25rem;
    `,
        AccordianWarningsHeader: css `
      background: #fff7e6;
      padding: 0.25rem 0.5rem;
      &:hover {
        background: #ffe7ba;
      }
    `,
        AccordianWarningsHeaderOpen: css `
      border-bottom: 1px solid #e8e8e8;
    `,
        AccordianWarningsLabel: css `
      color: #d36c08;
    `,
    };
});
export default function SpanDetail(props) {
    const { detailState, linksGetter, logItemToggle, logsToggle, processToggle, span, tagsToggle, traceStartTime, warningsToggle, referencesToggle, focusSpan, } = props;
    const { isTagsOpen, isProcessOpen, logs: logsState, isWarningsOpen, isReferencesOpen } = detailState;
    const { operationName, process, duration, relativeStartTime, spanID, logs, tags, warnings, references, } = span;
    const overviewItems = [
        {
            key: 'svc',
            label: 'Service:',
            value: process.serviceName,
        },
        {
            key: 'duration',
            label: 'Duration:',
            value: formatDuration(duration),
        },
        {
            key: 'start',
            label: 'Start Time:',
            value: formatDuration(relativeStartTime),
        },
    ];
    const deepLinkCopyText = `${window.location.origin}${window.location.pathname}?uiFind=${spanID}`;
    const styles = getStyles();
    return (React.createElement("div", null,
        React.createElement("div", { className: "ub-flex ub-items-center" },
            React.createElement("h2", { className: "ub-flex-auto ub-m0" }, operationName),
            React.createElement(LabeledList, { className: "ub-tx-right-align", dividerClassName: styles.divider, items: overviewItems })),
        React.createElement(UIDivider, { className: cx(styles.divider, 'ub-my1') }),
        React.createElement("div", null,
            React.createElement("div", null,
                React.createElement(AccordianKeyValues, { data: tags, label: "Tags", linksGetter: linksGetter, isOpen: isTagsOpen, onToggle: () => tagsToggle(spanID) }),
                process.tags && (React.createElement(AccordianKeyValues, { className: "ub-mb1", data: process.tags, label: "Process", linksGetter: linksGetter, isOpen: isProcessOpen, onToggle: () => processToggle(spanID) }))),
            logs && logs.length > 0 && (React.createElement(AccordianLogs, { linksGetter: linksGetter, logs: logs, isOpen: logsState.isOpen, openedItems: logsState.openedItems, onToggle: () => logsToggle(spanID), onItemToggle: logItem => logItemToggle(spanID, logItem), timestamp: traceStartTime })),
            warnings && warnings.length > 0 && (React.createElement(AccordianText, { className: styles.AccordianWarnings, headerClassName: styles.AccordianWarningsHeader, label: React.createElement("span", { className: styles.AccordianWarningsLabel }, "Warnings"), data: warnings, isOpen: isWarningsOpen, onToggle: () => warningsToggle(spanID) })),
            references && references.length > 1 && (React.createElement(AccordianReferences, { data: references, isOpen: isReferencesOpen, onToggle: () => referencesToggle(spanID), focusSpan: focusSpan })),
            React.createElement("small", { className: styles.debugInfo },
                React.createElement("span", { className: styles.debugLabel, "data-label": "SpanID:" }),
                " ",
                spanID,
                React.createElement(CopyIcon, { copyText: deepLinkCopyText, icon: "link", placement: "topRight", tooltipTitle: "Copy deep link to this span" })))));
}
