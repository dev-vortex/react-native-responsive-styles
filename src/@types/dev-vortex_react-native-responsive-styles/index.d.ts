import { ViewStyle, TextStyle, ImageStyle } from '@types/react-native'

declare module 'dev-vortex/react-native-responsive-styles' {
    interface StringifiedStyles {
        fontSize?: string | number
        letterSpacing?: string | number
        lineHeight?: string | number
        textShadowRadius?: string | number
        borderBottomLeftRadius?: string | number
        borderBottomRightRadius?: string | number
        borderTopLeftRadius?: string | number
        borderTopRightRadius?: string | number
        borderBottomWidth?: string | number
        borderTopWidth?: string | number
        borderRightWidth?: string | number
        borderLeftWidth?: string | number
        borderRadius?: string | number
        shadowRadius?: string | number
        borderWidth?: string | number
        aspectRatio?: string | number
        rotation?: string | number
        scaleX?: string | number
        scaleY?: string | number
        translateX?: string | number
        translateY?: string | number
    }

    type OriginalNamedStyles<T> = {
        [P in keyof T]: ViewStyle | TextStyle | ImageStyle
    }

    type NamedStyles<T> = {
        [P in keyof T]: ViewStyle | TextStyle | ImageStyle | StringifiedStyles
    }
    type NamedStyle = NamedStyles<any>

    export interface ConvertPluginFunction {
        (value: any): any
    }

    export type ConvertFunctions = Array<ConvertPluginFunction>

    export function getDpPtCorrection(
        pixelRatio: number,
        fontScale: number,
    ): ConvertPluginFunction

    export namespace ResponsiveStyles {
        export function create<T extends NamedStyles<T> | NamedStyle>(
            styleSheet: T,
            chain?: ConvertFunctions,
        ): OriginalNamedStyles<NamedStyles<T | any>>
    }
}
