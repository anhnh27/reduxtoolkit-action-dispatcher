import {Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const BASE_WIDTH = 414;
const BASE_HEIGHT = 736;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

const wRatio = SCREEN_WIDTH / BASE_WIDTH;
const hRatio = SCREEN_HEIGHT / BASE_HEIGHT;

export const wScale = (size: number, minFactor = 0.8) => {
  const minSize = size * minFactor;
  const maxSize = size * (2 - minFactor);
  const scaledSize = wp(((100 * size) / BASE_WIDTH) * wRatio);
  if (scaledSize > maxSize) {
    return maxSize;
  }
  return scaledSize > minSize ? scaledSize : minSize;
};

export const hScale = (size: number, minFactor = 0.8) => {
  const minSize = size * minFactor;
  const maxSize = size * (2 - minFactor);
  const scaledSize = hp(((100 * size) / BASE_HEIGHT) * hRatio);
  if (scaledSize > maxSize) {
    return maxSize;
  }
  return scaledSize > minSize ? scaledSize : minSize;
};

export const FontSize = {
  tiny: wScale(10, 1),
  teeny: wScale(11, 1),
  small: wScale(12, 1),
  xSmall: wScale(13, 1),
  regular: wScale(14, 1),
  massive: wScale(15, 1),
  large: wScale(16, 1),
  medium: wScale(20, 1),
  xLarge: wScale(20, 1),
  heading: wScale(24, 0.9),
};
