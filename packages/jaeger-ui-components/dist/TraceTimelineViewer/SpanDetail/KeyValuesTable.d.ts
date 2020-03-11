import * as React from 'react';
import { TNil } from '../../types';
import { KeyValuePair, Link } from '../../types/trace';
export declare const getStyles: () => {
    KeyValueTable: string;
    body: string;
    row: string;
    keyColumn: string;
    copyColumn: string;
    linkIcon: string;
    copyIcon: string;
};
export declare const LinkValue: {
    (props: {
        href: string;
        title?: string | undefined;
        children: React.ReactNode;
    }): JSX.Element;
    defaultProps: {
        title: string;
    };
};
declare type KeyValuesTableProps = {
    data: KeyValuePair[];
    linksGetter: ((pairs: KeyValuePair[], index: number) => Link[]) | TNil;
};
export default function KeyValuesTable(props: KeyValuesTableProps): JSX.Element;
export {};
