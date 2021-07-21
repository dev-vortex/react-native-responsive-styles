import { expect } from 'chai'
import responsiveStyles, { ConvertPluginFunction } from '~/index'

describe('[main]', () => {
    describe('import', () => {
        it('should have a create method in default exported', () => {
            expect(responsiveStyles.create).to.exist
        })
    })

    describe('create', () => {
        it('should return a style object when providing a valid style and a valid chain', () => {
            const startingStyle = {
                test: { width: '10@dp' },
            }
            const expectedReturnStyle = {
                test: { width: 10 },
            }
            const mockedChainLink: ConvertPluginFunction = style =>
                expectedReturnStyle
            const resultingStyle = responsiveStyles.create(startingStyle, [
                mockedChainLink,
            ])
            expect(resultingStyle).to.equal(expectedReturnStyle)
        })
        it('should return an error not providing a chain', () => {
            const startingStyle = {
                test: { width: '10@dp' },
            }
            const badCall = () => responsiveStyles.create(startingStyle)
            // console.log('here', resultingStyle)
            expect(badCall).to.throw('No chain provided')
        })
    })
})
