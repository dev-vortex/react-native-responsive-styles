import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { NamedStyles, NamedStyle } from './index'

type OriginalNamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle
}
type ConversionFunction = (val: any) => any
type RecurrentConversionFunctionNew = <T>(
    value: T | string,
) => OriginalNamedStyles<T>

const mapObject = <T>(obj: NamedStyle, fn: RecurrentConversionFunctionNew) =>
    Object.keys(obj).reduce((res, key: string) => {
        const value = obj[key] as string
        return {
            ...res,
            ...{ [key]: fn(value) },
        }
    }, {}) as OriginalNamedStyles<T>

const isObject = (myVar: unknown): boolean =>
    myVar && typeof myVar === 'object' ? true : false

const deepMap = <T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | any,
    fn: ConversionFunction,
): OriginalNamedStyles<T> => {
    const deepMapper = (value => {
        return isObject(value) ? deepMap(value, fn) : fn(value)
    }) as RecurrentConversionFunctionNew

    if (Array.isArray(styles)) {
        return styles.map(style => deepMapper(style)) as OriginalNamedStyles<T>
    }
    if (isObject(styles)) {
        return mapObject(styles, deepMapper)
    }
    return styles
}

export default deepMap
