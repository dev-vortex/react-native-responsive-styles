import { ConvertFunction } from "~/types"

export const dpPtCorrection = (pixelRatio: number, fontScale: number): ConvertFunction => (value: any) => {

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
                result = size * pixelRatio
                break
            case 'pt':
                result = size * PX_PT_RATIO * fontScale
                break
        }
    }

    return result
}
