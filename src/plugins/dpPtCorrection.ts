import { ConvertPluginFunction } from '~/types'
import deepMap from '~/deep-map'

const dpPtCorrectionImplementation =
    (
        definedPixelRatio: number,
        definedFontScale: number,
    ): ConvertPluginFunction =>
    (value: any) => {
        // Groups                      Size (number)           Selector (type)
        //                             1                       2
        const validResponsiveRegex = /^(\-?\d+(?:\.\d{1,3})?)@(dp|pt)$/
        const PX_PT_RATIO = 1.328

        let result = value
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

const dpPtCorrection =
    (
        definedPixelRatio: number,
        definedFontScale: number,
    ): ConvertPluginFunction =>
    (styles: any) => {
        return deepMap(
            styles,
            dpPtCorrectionImplementation(definedPixelRatio, definedFontScale),
        )
    }

export const getDpPtCorrection = (
    pixelRatio = 1,
    fontScale = 1,
): ConvertPluginFunction => dpPtCorrection(pixelRatio, fontScale)
