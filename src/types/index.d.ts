import {
    ViewStyle,
    TextStyle,
    ImageStyle,
} from '@types/react-native'

export interface StringifiedStyles {
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

export type OriginalNamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle
}

export type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle | StringifiedStyles
}
export type NamedStyle = NamedStyles<any>

export type RecurrentConversionFunction = <T>(
    value: T | string,
) => OriginalNamedStyles<T>

export interface ConvertFunction { 
    (value: any): any 
}

export type ConvertFunctions = Array<ConvertFunction>

export interface DimensionCreationFunction {
    <T extends NamedStyles<T> | NamedStyle>(
        styleSheet: T,
        chain?: ConvertFunctions
    ): OriginalNamedStyles<NamedStyles<T|any>>
}
