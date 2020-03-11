import React from 'react';
export declare type ThemeOptions = Partial<Theme>;
export declare type Theme = {
    borderStyle: string;
};
export declare const defaultTheme: Theme;
export declare const ThemeProvider: React.ProviderExoticComponent<React.ProviderProps<Partial<Theme> | undefined>>;
declare type ThemeConsumerProps = {
    children: (theme: Theme) => React.ReactNode;
};
export declare function ThemeConsumer(props: ThemeConsumerProps): JSX.Element;
declare type WrappedWithThemeComponent<Props> = React.ComponentType<Omit<Props, 'theme'>> & {
    wrapped: React.ComponentType<Props>;
};
export declare const withTheme: <Props extends {
    theme: Theme;
}, Statics extends {} = {}>(Component: React.ComponentType<Props>) => WrappedWithThemeComponent<Props>;
export declare const createStyle: <Fn extends (this: any, ...newArgs: any[]) => ReturnType<Fn>>(fn: Fn) => Fn;
export {};
