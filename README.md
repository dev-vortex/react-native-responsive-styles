<p align="center">

[![Maintainability](https://api.codeclimate.com/v1/badges/a76006ef343525947a07/maintainability)](https://codeclimate.com/github/dev-vortex/react-native-responsive-styles/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a76006ef343525947a07/test_coverage)](https://codeclimate.com/github/dev-vortex/react-native-responsive-styles/test_coverage)

![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg) 
[![Conventiona Commits](https://img.shields.io/badge/conventional%20commits-friendly-pink)](https://www.conventionalcommits.org/)
</p>

# react-native-responsive-styles

A React-Native utility created to allow correct size attribution to elements on your apps UI across different sized devices.

## Instalation
```
yarn add @dev-vortex/react-native-responsive-styles

//or:

npm install --save @dev-vortex/react-native-responsive-styles
```

## Motivation
When developing with react-native, we constantly need to manually adjust styles to look great on a variety of different screen sizes. 

The idea was to allow a "replacement" or improvement to react styling by allowing a "chain" that will "understand" the provided styling, calculate the values and return the styles from react native style.

## ResponsiveSheets
```javascript
import { ResponsiveStyles } from '@dev-vortex/react-native-responsive-styles'

const styles = ResponsiveStyles.create({
    container: {
        height: '80@dp',
    },
    titleText: {
        fontSize: '20@pt',
    },
    descriptionText: {
        fontSize: '14@pt',
    },
})
...
```

ResponsiveSheets will take the same stylesObject a regular StyleSheet will take. It is also possible to use annotations that will automatically apply the formulas to provide the expected result:

- `<size>@dp` - will convert the Density-independent Pixels to device real pixels (based on density).
- `<size>@pt` - will convert the points into correct font size.

