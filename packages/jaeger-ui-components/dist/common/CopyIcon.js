// Copyright (c) 2019 Uber Technologies, Inc.
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
import copy from 'copy-to-clipboard';
import { UITooltip, UIButton } from '../uiElementsContext';
import { createStyle } from '../Theme';
const getStyles = createStyle(() => {
    return {
        CopyIcon: css `
      background-color: transparent;
      border: none;
      color: inherit;
      height: 100%;
      overflow: hidden;
      padding: 0px;
      &:focus {
        background-color: rgba(255, 255, 255, 0.25);
        color: inherit;
      }
    `,
    };
});
export default class CopyIcon extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            hasCopied: false,
        };
        this.handleClick = () => {
            this.setState({
                hasCopied: true,
            });
            copy(this.props.copyText);
        };
        this.handleTooltipVisibilityChange = (visible) => {
            if (!visible && this.state.hasCopied) {
                this.setState({
                    hasCopied: false,
                });
            }
        };
    }
    render() {
        const styles = getStyles();
        return (React.createElement(UITooltip, { arrowPointAtCenter: true, mouseLeaveDelay: 0.5, onVisibleChange: this.handleTooltipVisibilityChange, placement: this.props.placement, title: this.state.hasCopied ? 'Copied' : this.props.tooltipTitle },
            React.createElement(UIButton, { className: cx(styles.CopyIcon, this.props.className), htmlType: "button", icon: this.props.icon, onClick: this.handleClick })));
    }
}
CopyIcon.defaultProps = {
    className: undefined,
    icon: 'copy',
    placement: 'left',
};