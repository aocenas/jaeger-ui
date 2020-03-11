import * as React from 'react';
declare type LabeledListProps = {
    className?: string;
    dividerClassName?: string;
    items: {
        key: string;
        label: React.ReactNode;
        value: React.ReactNode;
    }[];
};
export default function LabeledList(props: LabeledListProps): JSX.Element;
export {};
