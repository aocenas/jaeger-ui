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
import IoAlert from 'react-icons/lib/io/alert';
import IoArrowRightA from 'react-icons/lib/io/arrow-right-a';
import IoNetwork from 'react-icons/lib/io/network';
import MdFileUpload from 'react-icons/lib/md/file-upload';
import { css } from 'emotion';
import cx from 'classnames';
import ReferencesButton from './ReferencesButton';
import TimelineRow from './TimelineRow';
import { formatDuration } from './utils';
import SpanTreeOffset from './SpanTreeOffset';
import SpanBar from './SpanBar';
import Ticks from './Ticks';
import { createStyle } from '../Theme';
const getStyles = createStyle(() => {
    const spanBar = css `
    label: spanBar;
  `;
    const spanBarLabel = css `
    label: spanBarLabel;
  `;
    const nameWrapper = css `
    label: nameWrapper;
    background: #f8f8f8;
    line-height: 27px;
    overflow: hidden;
    display: flex;
    &:hover {
      border-right: 1px solid #bbb;
      float: left;
      min-width: calc(100% + 1px);
      overflow: visible;
    }
  `;
    const nameWrapperMatchingFilter = css `
    label: nameWrapperMatchingFilter;
    background-color: #fffce4;
  `;
    const endpointName = css `
    label: endpointName;
    color: #808080;
  `;
    const view = css `
    label: view;
    position: relative;
  `;
    const viewExpanded = css `
    label: viewExpanded;
    background: #f8f8f8;
    outline: 1px solid #ddd;
  `;
    const viewExpandedAndMatchingFilter = css `
    label: viewExpandedAndMatchingFilter;
    background: #fff3d7;
    outline: 1px solid #ddd;
  `;
    const nameColumn = css `
    label: nameColumn;
    position: relative;
    white-space: nowrap;
    z-index: 1;
    &:hover {
      z-index: 1;
    }
  `;
    return {
        spanBar,
        spanBarLabel,
        nameWrapper,
        nameWrapperMatchingFilter,
        nameColumn,
        endpointName,
        view,
        viewExpanded,
        viewExpandedAndMatchingFilter,
        row: css `
      label: row;
      &:hover .${spanBar} {
        opacity: 1;
      }
      &:hover .${spanBarLabel} {
        color: #000;
      }
      &:hover .${nameWrapper} {
        background: #f8f8f8;
        background: linear-gradient(90deg, #fafafa, #f8f8f8 75%, #eee);
      }
      &:hover .${view} {
        background-color: #f5f5f5;
        outline: 1px solid #ddd;
      }
    `,
        rowClippingLeft: css `
      label: rowClippingLeft;
      & .${nameColumn}::before {
        content: ' ';
        height: 100%;
        position: absolute;
        width: 6px;
        background-image: linear-gradient(to right, rgba(25, 25, 25, 0.25), rgba(32, 32, 32, 0));
        left: 100%;
        z-index: -1;
      }
    `,
        rowClippingRight: css `
      label: rowClippingRight;
      & .${view}::before {
        content: ' ';
        height: 100%;
        position: absolute;
        width: 6px;
        background-image: linear-gradient(to left, rgba(25, 25, 25, 0.25), rgba(32, 32, 32, 0));
        right: 0%;
        z-index: 1;
      }
    `,
        rowExpanded: css `
      label: rowExpanded;
      & .${spanBar} {
        opacity: 1;
      }
      & .${spanBarLabel} {
        color: #000;
      }
      & .${nameWrapper}, &:hover .${nameWrapper} {
        background: #f0f0f0;
        box-shadow: 0 1px 0 #ddd;
      }
      & .${nameWrapperMatchingFilter} {
        background: #fff3d7;
      }
      &:hover .${view} {
        background: #eee;
      }
    `,
        rowMatchingFilter: css `
      label: rowMatchingFilter;
      background-color: #fffce4;
      &:hover .${nameWrapper} {
        background: linear-gradient(90deg, #fff5e1, #fff5e1 75%, #ffe6c9);
      }
      &:hover .${view} {
        background-color: #fff3d7;
        outline: 1px solid #ddd;
      }
    `,
        rowExpandedAndMatchingFilter: css `
      label: rowExpandedAndMatchingFilter;
      &:hover .${view} {
        background: #ffeccf;
      }
    `,
        name: css `
      label: name;
      color: #000;
      cursor: pointer;
      flex: 1 1 auto;
      outline: none;
      overflow: hidden;
      padding-left: 4px;
      padding-right: 0.25em;
      position: relative;
      text-overflow: ellipsis;
      &::before {
        content: ' ';
        position: absolute;
        top: 4px;
        bottom: 4px;
        left: 0;
        border-left: 4px solid;
        border-left-color: inherit;
      }

      /* This is so the hit area of the span-name extends the rest of the width of the span-name column */
      &::after {
        background: transparent;
        bottom: 0;
        content: ' ';
        left: 0;
        position: absolute;
        top: 0;
        width: 1000px;
      }
      &:focus {
        text-decoration: none;
      }
      &:hover > .${endpointName} {
        color: #000;
      }
    `,
        nameDetailExpanded: css `
      label: nameDetailExpanded;
      &::before {
        bottom: 0;
      }
    `,
        svcName: css `
      label: svcName;
      padding: 0 0.25rem 0 0.5rem;
      font-size: 1.05em;
    `,
        svcNameChildrenCollapsed: css `
      label: svcNameChildrenCollapsed;
      font-weight: bold;
      font-style: italic;
    `,
        errorIcon: css `
      label: errorIcon;
      background: #db2828;
      border-radius: 6.5px;
      color: #fff;
      font-size: 0.85em;
      margin-right: 0.25rem;
      padding: 1px;
    `,
        rpcColorMarker: css `
      label: rpcColorMarker;
      border-radius: 6.5px;
      display: inline-block;
      font-size: 0.85em;
      height: 1em;
      margin-right: 0.25rem;
      padding: 1px;
      width: 1em;
      vertical-align: middle;
    `,
        labelRight: css `
      label: labelRight;
      left: 100%;
    `,
        labelLeft: css `
      label: labelLeft;
      right: 100%;
    `,
    };
});
/**
 * This was originally a stateless function, but changing to a PureComponent
 * reduced the render time of expanding a span row detail by ~50%. This is
 * even true in the case where the stateless function has the same prop types as
 * this class and arrow functions are created in the stateless function as
 * handlers to the onClick props. E.g. for now, the PureComponent is more
 * performance than the stateless function.
 */
export default class SpanBarRow extends React.PureComponent {
    constructor() {
        super(...arguments);
        this._detailToggle = () => {
            this.props.onDetailToggled(this.props.span.spanID);
        };
        this._childrenToggle = () => {
            this.props.onChildrenToggled(this.props.span.spanID);
        };
    }
    render() {
        const { className, color, columnDivision, isChildrenExpanded, isDetailExpanded, isMatchingFilter, numTicks, rpc, showErrorIcon, getViewedBounds, traceStartTime, span, focusSpan, hoverIndentGuideIds, addHoverIndentGuideId, removeHoverIndentGuideId, clippingLeft, clippingRight, } = this.props;
        const { duration, hasChildren: isParent, operationName, process: { serviceName }, } = span;
        const label = formatDuration(duration);
        const viewBounds = getViewedBounds(span.startTime, span.startTime + span.duration);
        const viewStart = viewBounds.start;
        const viewEnd = viewBounds.end;
        const styles = getStyles();
        const labelDetail = `${serviceName}::${operationName}`;
        let longLabel;
        let hintClassName;
        if (viewStart > 1 - viewEnd) {
            longLabel = `${labelDetail} | ${label}`;
            hintClassName = styles.labelLeft;
        }
        else {
            longLabel = `${label} | ${labelDetail}`;
            hintClassName = styles.labelRight;
        }
        return (React.createElement(TimelineRow, { className: cx(styles.row, {
                [styles.rowExpanded]: isDetailExpanded,
                [styles.rowMatchingFilter]: isMatchingFilter,
                [styles.rowExpandedAndMatchingFilter]: isMatchingFilter && isDetailExpanded,
                [styles.rowClippingLeft]: clippingLeft,
                [styles.rowClippingRight]: clippingRight,
            }, className) },
            React.createElement(TimelineRow.Cell, { className: styles.nameColumn, width: columnDivision },
                React.createElement("div", { className: cx(styles.nameWrapper, { [styles.nameWrapperMatchingFilter]: isMatchingFilter }) },
                    React.createElement(SpanTreeOffset, { childrenVisible: isChildrenExpanded, span: span, onClick: isParent ? this._childrenToggle : undefined, hoverIndentGuideIds: hoverIndentGuideIds, addHoverIndentGuideId: addHoverIndentGuideId, removeHoverIndentGuideId: removeHoverIndentGuideId }),
                    React.createElement("a", { className: cx(styles.name, { [styles.nameDetailExpanded]: isDetailExpanded }), "aria-checked": isDetailExpanded, onClick: this._detailToggle, role: "switch", style: { borderColor: color }, tabIndex: 0 },
                        React.createElement("span", { className: cx(styles.svcName, {
                                [styles.svcNameChildrenCollapsed]: isParent && !isChildrenExpanded,
                            }) },
                            showErrorIcon && React.createElement(IoAlert, { className: styles.errorIcon }),
                            serviceName,
                            ' ',
                            rpc && (React.createElement("span", null,
                                React.createElement(IoArrowRightA, null),
                                ' ',
                                React.createElement("i", { className: styles.rpcColorMarker, style: { background: rpc.color } }),
                                rpc.serviceName))),
                        React.createElement("small", { className: styles.endpointName }, rpc ? rpc.operationName : operationName)),
                    span.references && span.references.length > 1 && (React.createElement(ReferencesButton, { references: span.references, tooltipText: "Contains multiple references", focusSpan: focusSpan },
                        React.createElement(IoNetwork, null))),
                    span.subsidiarilyReferencedBy && span.subsidiarilyReferencedBy.length > 0 && (React.createElement(ReferencesButton, { references: span.subsidiarilyReferencedBy, tooltipText: `This span is referenced by ${span.subsidiarilyReferencedBy.length === 1 ? 'another span' : 'multiple other spans'}`, focusSpan: focusSpan },
                        React.createElement(MdFileUpload, null))))),
            React.createElement(TimelineRow.Cell, { className: cx(styles.view, {
                    [styles.viewExpanded]: isDetailExpanded,
                    [styles.viewExpandedAndMatchingFilter]: isMatchingFilter && isDetailExpanded,
                }), "data-test-id": "span-view", style: { cursor: 'pointer' }, width: 1 - columnDivision, onClick: this._detailToggle },
                React.createElement(Ticks, { numTicks: numTicks }),
                React.createElement(SpanBar, { rpc: rpc, viewStart: viewStart, viewEnd: viewEnd, getViewedBounds: getViewedBounds, color: color, shortLabel: label, longLabel: longLabel, traceStartTime: traceStartTime, span: span, labelClassName: `${styles.spanBarLabel} ${hintClassName}`, className: styles.spanBar }))));
    }
}
SpanBarRow.defaultProps = {
    className: '',
    rpc: null,
};