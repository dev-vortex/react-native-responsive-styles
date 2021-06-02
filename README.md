<p align="center">
    <a href="https://travis-ci.com/github/dev-vortex/react-native-responsive-styles"><img src="https://badgen.net/travis/dev-vortex/react-native-responsive-styles?icon=travis&label=build"/></a>
    <a href="https://www.npmjs.com/package/@dev-vortex/react-native-responsive-styles"><img src="https://badgen.net/npm/v/@dev-vortex/react-native-responsive-styles?icon=npm&label"/></a>
    <a href="https://www.npmjs.com/package/@dev-vortex/react-native-responsive-styles"><img src="https://badgen.net/npm/license/@dev-vortex/react-native-responsive-styles?icon=npm"/></a> 
    <a href="https://www.npmjs.com/package/@dev-vortex/react-native-responsive-styles"><img src="https://badgen.net/npm/types/@dev-vortex/react-native-responsive-styles?icon=typescript"/></a> 
</p>

<p align="center">
    <a href="https://bundlephobia.com/result?p=@dev-vortex/react-native-responsive-styles"><img src="https://badgen.net/bundlephobia/min/@dev-vortex/react-native-responsive-styles?label=min"/></a> 
    <a href="https://bundlephobia.com/result?p=@dev-vortex/react-native-responsive-styles"><img src="https://badgen.net/bundlephobia/minzip/@dev-vortex/react-native-responsive-styles?label=min+gz"/></a> 
    <a href="https://lgtm.com/projects/g/dev-vortex/react-native-responsive-styles/alerts/"><img src="https://badgen.net/lgtm/grade/g/dev-vortex/react-native-responsive-styles?icon=lgtm&label=quality"/></a> 

</p>

<p align="center">
    <a href="https://codeclimate.com/github/dev-vortex/react-native-responsive-styles/maintainability"><img src="https://api.codeclimate.com/v1/badges/a76006ef343525947a07/maintainability"/></a>
    <a href="https://codeclimate.com/github/dev-vortex/react-native-responsive-styles/test_coverage"><img src="https://api.codeclimate.com/v1/badges/a76006ef343525947a07/test_coverage"/></a>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg"/>
    <a href="https://www.conventionalcommits.org/"><img src="https://img.shields.io/badge/conventional-commits-pink"/></a>
</p>

# react-native-responsive-styles

A React-Native utility created to allow correct size attribution to elements on your apps UI across different sized devices.

## Instalation
```
yarn add @dev-vortex/react-native-responsive-styles
```
or

```
npm install --save @dev-vortex/react-native-responsive-styles
```

## Motivation
When developing with react-native, we constantly need to manually adjust styles to look great on a variety of different screen sizes. 

The idea was to allow a "replacement" or improvement to react styling by allowing a "chain" that will "understand" the provided styling, calculate the values and return the styles from react native style.

## ResponsiveSheets
```typescript
import { StyleSheet, PixelRatio } from 'react-native'
import ResponsiveStyles, { getDpPtCorrection } from '@dev-vortex/react-native-responsive-styles'

const dpPtCorrectionPlugin = getDpPtCorrection(PixelRatio.get(), PixelRatio.getFontScale())

const pluginsChain = [
    dpPtCorrectionPlugin, 
    StyleSheet.create
]

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
}, pluginsChain)

...
```

ResponsiveSheets will take the same stylesObject a regular StyleSheet will take. It is also possible to use annotations that will automatically apply the formulas to provide the expected result:

- `<size>@dp` - will convert the Density-independent Pixels to device real pixels (based on density).
- `<size>@pt` - will convert the points into correct font size.

## Custom plugins
It is possible to create and add plugins to the chain (second argument in `create`)

The plugin signature is defined by the interface `ConvertPluginFunction`. And it should expect to receive the value of a style attribute and return the same value but with the conversion applied (or the same if nothing need to be converted).