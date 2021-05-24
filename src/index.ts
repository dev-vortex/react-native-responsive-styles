import { ConvertFunction, ConvertFunctions, DimensionCreationFunction } from './types'
import deepMap from './deep-map'

const create: DimensionCreationFunction = (stylesheet, chain: ConvertFunctions = []) => {
    return chain.reduce((previousStyle: any, chainFuntion: ConvertFunction) => {
        return deepMap(previousStyle, chainFuntion);
    }, stylesheet)
}

const correctDimensionCreator = {
    create,
}

export default correctDimensionCreator
