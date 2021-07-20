import { expect } from 'chai'
import { ConvertPluginFunction } from '~/index'
import deepMap from '~/deep-map'

describe('[utility] deepMap', () => {
    it('should convert the provided simple style object', () => {
        const expectedReturnConversion = 10000
        const startingStyle = { width: '10@dp' }
        const expectedStyle = { width: expectedReturnConversion }

        const mockedChainLink: ConvertPluginFunction = () =>
            expectedReturnConversion

        const result = deepMap(startingStyle, mockedChainLink)

        expect(result).to.deep.equal(expectedStyle)
    })

    it('should convert the provided style object', () => {
        const expectedReturnConversion = 10000
        const startingStyle = {
            test: { width: '10@dp' },
        }
        const expectedStyle = {
            test: { width: expectedReturnConversion },
        }
        const mockedChainLink: ConvertPluginFunction = () =>
            expectedReturnConversion

        const result = deepMap(startingStyle, mockedChainLink)

        expect(result).to.deep.equal(expectedStyle)
    })

    it('should convert the provided style object array (single element)', () => {
        const expectedReturnConversion = 10000
        const startingStyle = [
            {
                test: { width: '10@dp' },
            },
        ]
        const expectedStyle = [
            {
                test: { width: expectedReturnConversion },
            },
        ]
        const mockedChainLink: ConvertPluginFunction = () =>
            expectedReturnConversion

        const result = deepMap(startingStyle, mockedChainLink)

        expect(result).to.deep.equal(expectedStyle)
    })

    it('should convert the provided style object array (multiple elements)', () => {
        const expectedReturnConversion = 10000
        const startingStyle = [
            {
                test: { width: '10@dp' },
            },
            {
                test1: { width: '10@dp' },
            },
        ]
        const expectedStyle = [
            {
                test: { width: expectedReturnConversion },
            },
            {
                test1: { width: expectedReturnConversion },
            },
        ]
        const mockedChainLink: ConvertPluginFunction = () =>
            expectedReturnConversion

        const result = deepMap(startingStyle, mockedChainLink)

        expect(result).to.deep.equal(expectedStyle)
    })

    it('should return the same input if not object or object[]', () => {
        const expectedReturnConversion = 10000
        const startingStyle = 'This needs to be returned'
        const mockedChainLink: ConvertPluginFunction = () =>
            expectedReturnConversion

        const result = deepMap(startingStyle, mockedChainLink)

        expect(result).to.equal(startingStyle)
    })

    it('should return the same input if not object[]', () => {
        const expectedReturnConversion = 10000
        const startingStyle = [
            'This needs to be returned',
            'This also needs to be returned',
        ]
        const mockedChainLink: ConvertPluginFunction = () =>
            expectedReturnConversion

        const result = deepMap(startingStyle, mockedChainLink)
        expect(result).to.deep.equal(startingStyle)
    })
})
