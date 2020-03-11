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
import ExternalLinkContext from './externalLinkContext';
export default function ReferenceLink(props) {
    const { reference, children, className, focusSpan } = props, otherProps = __rest(props, ["reference", "children", "className", "focusSpan"]);
    delete otherProps.onClick;
    if (reference.span) {
        return (React.createElement("a", Object.assign({ role: "button", onClick: () => focusSpan(reference.spanID), className: className }, otherProps), children));
    }
    return (React.createElement(ExternalLinkContext.Consumer, null, createLinkToExternalSpan => {
        if (!createLinkToExternalSpan) {
            throw new Error("ExternalLinkContext does not have a value, you probably forgot to setup it's provider");
        }
        return (React.createElement("a", Object.assign({ href: createLinkToExternalSpan(reference.traceID, reference.spanID), target: "_blank", rel: "noopener noreferrer", className: className }, otherProps), children));
    }));
}
