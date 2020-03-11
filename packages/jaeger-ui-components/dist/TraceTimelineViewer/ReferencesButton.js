// Copyright (c) 2019 The Jaeger Authors.
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
import NewWindowIcon from '../common/NewWindowIcon';
import { UITooltip, UIDropdown, UIMenuItem, UIMenu } from '../uiElementsContext';
import ReferenceLink from '../url/ReferenceLink';
import { createStyle } from '../Theme';
export const getStyles = createStyle(() => {
    return {
        MultiParent: css `
      padding: 0 5px;
      color: #000;
      & ~ & {
        margin-left: 5px;
      }
    `,
        TraceRefLink: css `
      display: flex;
      justify-content: space-between;
    `,
        NewWindowIcon: css `
      margin: 0.2em 0 0;
    `,
        tooltip: css `
      max-width: none;
    `,
    };
});
export default class ReferencesButton extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.referencesList = (references) => {
            const styles = getStyles();
            return (React.createElement(UIMenu, null, references.map(ref => {
                const { span, spanID } = ref;
                return (React.createElement(UIMenuItem, { key: `${spanID}` },
                    React.createElement(ReferenceLink, { reference: ref, focusSpan: this.props.focusSpan, className: styles.TraceRefLink },
                        span
                            ? `${span.process.serviceName}:${span.operationName} - ${ref.spanID}`
                            : `(another trace) - ${ref.spanID}`,
                        !span && React.createElement(NewWindowIcon, { className: styles.NewWindowIcon }))));
            })));
        };
    }
    render() {
        const { references, children, tooltipText, focusSpan } = this.props;
        const styles = getStyles();
        const tooltipProps = {
            arrowPointAtCenter: true,
            mouseLeaveDelay: 0.5,
            placement: 'bottom',
            title: tooltipText,
            overlayClassName: styles.tooltip,
        };
        if (references.length > 1) {
            return (React.createElement(UITooltip, Object.assign({}, tooltipProps),
                React.createElement(UIDropdown, { overlay: this.referencesList(references), placement: "bottomRight", trigger: ['click'] },
                    React.createElement("a", { className: styles.MultiParent }, children))));
        }
        const ref = references[0];
        return (React.createElement(UITooltip, Object.assign({}, tooltipProps),
            React.createElement(ReferenceLink, { reference: ref, focusSpan: focusSpan, className: styles.MultiParent }, children)));
    }
}
