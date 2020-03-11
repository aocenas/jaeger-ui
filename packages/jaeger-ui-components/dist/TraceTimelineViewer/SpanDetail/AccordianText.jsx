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
import IoIosArrowDown from 'react-icons/lib/io/ios-arrow-down';
import IoIosArrowRight from 'react-icons/lib/io/ios-arrow-right';
import TextList from './TextList';
import { getStyles as getAccordianKeyValuesStyles } from './AccordianKeyValues';
import { createStyle } from '../../Theme';
const getStyles = createStyle(() => {
    return {
        header: css `
      cursor: pointer;
      overflow: hidden;
      padding: 0.25em 0.1em;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background: #e8e8e8;
      }
    `,
    };
});
export default function AccordianText(props) {
    const { className, data, headerClassName, highContrast, interactive, isOpen, label, onToggle } = props;
    const isEmpty = !Array.isArray(data) || !data.length;
    const accordianKeyValuesStyles = getAccordianKeyValuesStyles();
    const iconCls = cx('u-align-icon', { [accordianKeyValuesStyles.emptyIcon]: isEmpty });
    let arrow = null;
    let headerProps = null;
    if (interactive) {
        arrow = isOpen ? <IoIosArrowDown className={iconCls}/> : <IoIosArrowRight className={iconCls}/>;
        headerProps = {
            'aria-checked': isOpen,
            onClick: isEmpty ? null : onToggle,
            role: 'switch',
        };
    }
    const styles = getStyles();
    return (<div className={className || ''}>
      <div className={cx(styles.header, headerClassName)} {...headerProps} data-test-id="AccordianText--header">
        {arrow} <strong>{label}</strong> ({data.length})
      </div>
      {isOpen && <TextList data={data}/>}
    </div>);
}
AccordianText.defaultProps = {
    className: null,
    highContrast: false,
    interactive: true,
    onToggle: null,
};
