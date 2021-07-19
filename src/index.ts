import {
    ConvertPluginFunction,
    ConvertFunctions,
    DimensionCreationFunction,
} from '~/types'
export * from '~/plugins'

const create: DimensionCreationFunction = (
    stylesheet,
    chain: ConvertFunctions = [],
) => {
    return chain.reduce(
        (previousStyle: any, chainFuntion: ConvertPluginFunction) =>
            chainFuntion(previousStyle),
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
