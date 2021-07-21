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
    if (chain.length === 0) {
        throw new Error('No chain provided')
    }
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
