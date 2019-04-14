import React from 'react'
import { Animated } from 'react-native'
import { Icon } from 'native-base'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

export default class Card extends React.PureComponent {
  render() {
    const { panResponder, cardRotationValue, xValue, cardOpacity, showLeftSwipeIcon, showRightSwipeIcon, rightOpacityValue, leftOpacityValue } = this.props
    
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
    backgroundColor: '#cc5500',
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