import { expect } from 'chai'
// import { ConvertPluginFunction } from '~/index'
import { getDpPtCorrection } from '~/plugins'

const PX_PT_RATIO = 1.328
const factor = 1
const size = 10

describe('[plugin] dpPtCorrection', () => {
    it('should provide a chain correction function assuming factors as 1 if none provided', () => {
        const result = getDpPtCorrection()
        expect(result).to.exist
    })

    it('should provide a chain correction function ', () => {
        const result = getDpPtCorrection(1, 1)
        expect(result).to.exist
    })

    it('should convert normal style object', () => {
        const startingStyle = {
            test: { width: `${size}@dp`, fontSize: `${size}@pt` },
        }

        const correctFunction = getDpPtCorrection(factor, factor)
        const result = correctFunction(startingStyle)

        expect(typeof result).to.equal('object')
        expect(result.test).to.exist
        expect(result.test.width).to.exist
        expect(result.test.width).to.equal(size * factor)
        expect(result.test.fontSize).to.exist
        expect(result.test.fontSize).to.equal(size * PX_PT_RATIO * factor)
    })

    it('should convert an array of one style object', () => {
        const startingStyle = [
            {
                test: { width: `${size}@dp`, fontSize: `${size}@pt` },
            },
        ]

        const correctFunction = getDpPtCorrection(factor, factor)
        const result = correctFunction(startingStyle)

        expect(Array.isArray(result)).to.true
        expect(result.length).to.equal(1)
        expect(result[0].test).to.exist
        expect(result[0].test.width).to.exist
        expect(result[0].test.width).to.equal(size * factor)
        expect(result[0].test.fontSize).to.exist
        expect(result[0].test.fontSize).to.equal(size * PX_PT_RATIO * factor)
    })

    it('should return same value if not responsible to handle it', () => {
        const startingStyle = {
            test: { width: `${size}@xxx` },
        }

        const correctFunction = getDpPtCorrection(factor, factor)
        const result = correctFunction(startingStyle)

        expect(typeof result).to.equal('object')
        expect(result).to.deep.equal(startingStyle)
    })

    it('should return the input without change if not valid', () => {
        const startingStyle = ['This', 'is', 'invalid']

        const correctFunction = getDpPtCorrection(1, 1)
        const result = correctFunction(startingStyle)

        expect(result).to.deep.equal(startingStyle)
    })
})
