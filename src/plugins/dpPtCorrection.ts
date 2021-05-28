import { ConvertPluginFunction } from '~/types'

let definedPixelRatio = 1
let definedFontScale = 1

export const getDpPtCorrection = (
    pixelRatio: number,
    fontScale: number,
): ConvertPluginFunction => {
    definedPixelRatio = pixelRatio
    definedFontScale = fontScale
    return dpPtCorrection
}

const dpPtCorrection = (value: any) => {
    // Groups                      Size (number)           Selector (type)
    //                             1                       2
    const validResponsiveRegex = /^(\-?\d+(?:\.\d{1,3})?)@(dp|pt)$/
    const PX_PT_RATIO = 1.328

    let result = value
    if (!validResponsiveRegex.test(value)) {
        return value
    }

    const regexExecResult = validResponsiveRegex.exec(value)

    if (regexExecResult) {
        const size = parseFloat(regexExecResult[1])
        const selector = regexExecResult[2]

        switch (selector) {
            case 'dp':
                result = size * definedPixelRatio
                break
            case 'pt':
                result = size * PX_PT_RATIO * definedFontScale
                break
        }
    }

    return result
}
