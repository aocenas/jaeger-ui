// Copyright (c) 2018 Uber Technologies, Inc.
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
import cx from 'classnames';
import IoAndroidOpen from 'react-icons/lib/io/android-open';
import { css } from 'emotion';
import { createStyle } from '../Theme';
const getStyles = createStyle(() => {
    return {
        NewWindowIconLarge: css `
      label: NewWindowIconLarge;
      font-size: 1.5em;
    `,
    };
});
export default function NewWindowIcon(props) {
    const { isLarge, className } = props, rest = __rest(props, ["isLarge", "className"]);
    const styles = getStyles();
    const cls = cx({ [styles.NewWindowIconLarge]: isLarge }, className);
    return <IoAndroidOpen className={cls} {...rest}/>;
}
NewWindowIcon.defaultProps = {
    isLarge: false,
};
