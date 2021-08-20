import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#7c1518',
  orange: '#FFA133',
  lightOrange: '#FFA133',
  lightOrange2: '#FDDED4',
  lightOrange3: '#FFD9AD',
  green: '#27AE60',
  red: '#FF1717',
  blue: '#0064C0',
  darkBlue: '#111A2C',
  darkGray: '#525C67',
  darkGray2: '#757D85',
  gray: '#898B9A',
  gray2: '#BBBDC1',
  gray3: '#CFD0D7',
  lightGray: '#d0d0d0',
  lightGray1: '#DDDDDD',
  lightGray2: '#F5F5F8',
  white2: '#fafafa',
  white: '#FFFFFF',
  black: '#000000',

  transparent: 'transparent',
  transparentBlack1: 'rgba(0, 0, 0, 0.1)',
  transparentBlack5: 'rgba(0, 0, 0, 0.5)',
  transparentBlack7: 'rgba(0, 0, 0, 0.7)',
};

export const SIZES = {
  // global sizes
  base: 8,
  fontSize: 16,
  radius: 12,
  padding: 16,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

const appTheme = {COLORS, SIZES};

export default appTheme;
