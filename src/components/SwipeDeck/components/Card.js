import React from 'react'
import { Animated, StyleSheet, Image, Dimensions } from 'react-native'
import { Icon } from 'native-base'

import { ProgressiveImage } from '../../Welcome/CardFeed'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)
const VIEW_WIDTH = (Dimensions.get('window').width) * (0.6) * (0.9)
export default class Card extends React.PureComponent {
  render() {
    const { card, panResponder, cardRotationValue, xValue, cardOpacity, showLeftSwipeIcon, showRightSwipeIcon, rightOpacityValue, leftOpacityValue } = this.props
    const imageHeight = (card.imageHeight / card.imageWidth) * VIEW_WIDTH
    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.card,
          {
            opacity: cardOpacity,
            transform: [
              { translateX: xValue },
              { rotate: cardRotationValue }
            ]
          }
        ]}
      >
        {showLeftSwipeIcon && <AnimatedIcon style={[styles.leftIcon, { opacity: leftOpacityValue }]} name="thumbs-down" /> }
        {showRightSwipeIcon && <AnimatedIcon style={[styles.rightIcon, { opacity: rightOpacityValue }]} name="thumbs-up" /> }
        
        <Image
          source={{ uri: card.largeImageURL }}
          style={{ height: imageHeight, width: VIEW_WIDTH, flex: 1 }}
          resizeMode="contain"
        />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: '95%',
    height: '60%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#777777',
    borderWidth: 1,
  },
  leftIcon: {
    position: 'absolute',
    top: 20,
    right: 30,
    color: 'white',
    fontSize: 30,
    backgroundColor: 'transparent'
  },
  rightIcon: {
    position: 'absolute',
    top: 20,
    left: 30,
    color: 'white',
    fontSize: 30,
    backgroundColor: 'transparent'
  },
})