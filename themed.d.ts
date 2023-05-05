import '@rneui/themed';

declare module '@rneui/themed' {
    export interface Theme {
        screenContainer: {
            flex: number;
            marginLeft: number;
            marginRight: number;
            backgroundColor: string;
        };
    }
}