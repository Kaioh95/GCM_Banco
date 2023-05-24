import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string,
        colors: {
            primary: string,
            secondary: string,
            tertiary: string,
            background: string,
            menu: string,
            menuLight: string,
            menuItem: string,
            text: string,
            lightText: string,
        },
        boxShadow: string,
        headerShadow: string,
        font: {
            size: {
                xSmall: string,
                small: string,
                medium: string,
                large: string,
                xLarge: string,
            },
            family: string,
            weight: {
                regular: number,
                medium: number,
                semiBold: number,
                bold: number,
            },
        },
        borderRadius: {
            card: string,
            button: string,
            addButton: string,
            searchBar: string,
        },
        device: {
            mobile: (mediaQueryType? = string) => string,
            tablet: (mediaQueryType? = string) => string,
            desktop: (mediaQueryType? = string) => string,
            ultrawide: (mediaQueryType? = string) => string,
        }
    }
}