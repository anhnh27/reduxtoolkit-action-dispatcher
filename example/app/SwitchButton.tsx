import React, {FC, memo, useCallback, useEffect, useRef} from 'react';

import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {wScale} from './utils';

const WIDTH = wScale(68, 0.9);
const HEIGHT = wScale(32, 0.9);
const PADDING = wScale(4, 0.9);
const ICON_SIZE = wScale(24, 0.9);
const BORDER_RADIUS = wScale(24, 0.9);

export interface SwitchButtonProps extends TouchableOpacityProps {
  value: boolean;
  disabled?: boolean;
  onSwitch: (value: boolean) => void;
}

const SwitchButton: FC<SwitchButtonProps> = ({
  value,
  disabled,
  style,
  onSwitch,
  ...props
}) => {
  const switchAnimation = useRef(new Animated.Value(0)).current;
  const textAnimation = useRef(new Animated.Value(0)).current;

  const switchIconAnimation = useCallback(() => {
    if (value) {
      Animated.parallel([
        Animated.timing(switchAnimation, {
          toValue: WIDTH - ICON_SIZE - PADDING * 2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(textAnimation, {
          toValue: (ICON_SIZE - WIDTH) / 2 + PADDING,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(switchAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(textAnimation, {
          toValue: PADDING,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [value, switchAnimation, textAnimation]);

  const handleSwitch = useCallback(() => {
    onSwitch(!value);
  }, [value, onSwitch]);

  useEffect(() => {
    switchIconAnimation();
  }, [switchIconAnimation]);

  return (
    <TouchableOpacity
      onPress={handleSwitch}
      style={StyleSheet.flatten([
        styles.root,
        value ? styles.checked : styles.unCheck,
        disabled && styles.disabled,
        style,
      ])}
      disabled={disabled}
      {...props}>
      <Animated.View
        style={StyleSheet.flatten([
          styles.switchIcon,
          {
            transform: [
              {
                translateX: switchAnimation,
              },
            ],
          },
        ])}
      />
      <Animated.Text
        style={{
          transform: [
            {
              translateX: textAnimation,
            },
          ],
          width: '100%',
          color: 'white',
          fontWeight: '700',
          fontSize: wScale(16, 0.9),
        }}>
        {value ? 'ON' : 'OFF'}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: WIDTH,
    height: HEIGHT,
    padding: PADDING,
    borderRadius: BORDER_RADIUS,
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#62687125',
  },
  unCheck: {
    backgroundColor: '#a0a9ba',
  },
  checked: {
    backgroundColor: '#00b4e3',
  },
  switchIcon: {
    backgroundColor: 'white',
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
  },
});

export default memo(SwitchButton);
