import { NamedStyle, NamedStyles, ConvertFunction, OriginalNamedStyles, RecurrentConversionFunction } from './types'

const mapObject = <T>(obj: NamedStyle, fn: RecurrentConversionFunction) =>
    Object.keys(obj).reduce((res, key: string) => {
        const value = obj[key] as string
        return {
            ...res,
            ...{ [key]: fn(value) },
        }
    }, {}) as OriginalNamedStyles<T>

const isObject = (myVar: any): boolean =>
    myVar && typeof myVar === 'object' ? true : false

const deepMap = <T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | any,
    fn: ConvertFunction,
): OriginalNamedStyles<T> => {
    const deepMapper = (value => {
        return isObject(value) ? deepMap(value, fn) : fn(value)
    }) as RecurrentConversionFunction

    if (Array.isArray(styles)) {
        return styles.map(style => deepMapper(style)) as OriginalNamedStyles<T>
    }
    if (isObject(styles)) {
        return mapObject(styles, deepMapper)
    }
    return styles
}

export default deepMap
