import {
    ConvertPluginFunction,
    ConvertFunctions,
    DimensionCreationFunction,
} from '~/types'
import deepMap from '~/deep-map'
export * from '~/plugins'

const create: DimensionCreationFunction = (
    stylesheet,
    chain: ConvertFunctions = [],
) => {
    return chain.reduce(
        (previousStyle: any, chainFuntion: ConvertPluginFunction) => {
            return deepMap(previousStyle, chainFuntion)
        },
        stylesheet,
    )
}

const correctDimensionCreator = {
    create,
}

export default correctDimensionCreator
export type {
    ConvertPluginFunction,
    ConvertFunctions,
    DimensionCreationFunction,
}
