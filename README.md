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

- \<size\>@dp - will convert the device pixels to real pixels.
- \<size\>@pt - will convert the points into correct font size.

