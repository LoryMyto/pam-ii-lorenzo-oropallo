import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  PanGestureHandler,
  PanGestureHandlerGestureEvent, // Correção na importação do tipo de evento
} from 'react-native-gesture-handler';

const EmojiSticker = ({ imageSize, stickerSource }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);

  const doubleTapHandler = () => {
    scaleImage.value = withSpring(scaleImage.value === imageSize ? imageSize * 2 : imageSize);
  };

  const panHandler = Animated.event<PanGestureHandlerGestureEvent>(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panHandler}>
      <Animated.View style={[styles.container, containerStyle]}>
        <TapGestureHandler onGestureEvent={doubleTapHandler}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[styles.image, imageStyle, { width: imageSize, height: imageSize }]}
          />
        </TapGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default EmojiSticker;
