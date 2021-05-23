import {
    PixelRatio,
    StyleSheet,
    RegisteredStyle,
    ViewStyle,
    TextStyle,
    ImageStyle,
} from 'react-native'
import deepMap from './deep-map'

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
export type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle | StringifiedStyles
}
export type NamedStyle = NamedStyles<any>

type ChainableFunctionsInterface = <T extends NamedStyles<T> | NamedStyle>(
    styleSheet: T,
) => {
    [P in keyof T]: RegisteredStyle<
        T[P] & Record<Extract<keyof T[P], keyof StringifiedStyles>, number>
    >
}

type DimensionCreationFunction = <T extends NamedStyles<T> | NamedStyle>(
    styleSheet: T,
    chain: Array<ChainableFunctionsInterface>
) => {
    [P in keyof T]: RegisteredStyle<
        T[P] & Record<Extract<keyof T[P], keyof StringifiedStyles>, number>
    >
}

// Groups                     Size                    Func
//                             1                       2
const validResponsiveRegex = /^(\-?\d+(?:\.\d{1,3})?)@(dp|pt)$/
const PX_PT_RATIO = 1.328

const correctDimension = (value: any) => {
    let result = value
    if (!validResponsiveRegex.test(value)) {
        return value
    }

    const regexExecResult = validResponsiveRegex.exec(value)

    if (regexExecResult) {
        const size = parseFloat(regexExecResult[1])
        const scaleFunc = regexExecResult[2]

        switch (scaleFunc) {
            case 'dp':
                result = PixelRatio.getPixelSizeForLayoutSize(size)
                break
            case 'pt':
                result = size * PX_PT_RATIO * PixelRatio.getFontScale()
                break
        }
    }

    return result
}

const correctDimensionCreator = {
    create: ((stylesheet, chain = []) => {
        const correctedStyles = deepMap(stylesheet, correctDimension)
        const normalizedStyles = chain.reduce((previousStyle, chainFuntion) => {
            return chainFuntion(previousStyle)
        }, correctedStyles)
        return StyleSheet.create(normalizedStyles)
    }) as DimensionCreationFunction,
}

export default correctDimensionCreator
