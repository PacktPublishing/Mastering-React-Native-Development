import React from 'react'
import { Animated } from 'react-native'
import { Icon } from 'native-base'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

export default class Card extends React.PureComponent {
  render() {
    const { panResponder, cardRotationValue, xValue, cardStyle, cardOpacity, leftIconStyle, rightIconStyle, showLeftSwipeText, showRightSwipeText, rightOpacityValue, leftOpacityValue } = this.props
    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          cardStyle,
          {
            opacity: cardOpacity,
            transform: [
              { translateX: xValue },
              { rotate: cardRotationValue }
            ]
          }
        ]}
      >
        {showLeftSwipeText && <AnimatedIcon style={[leftIconStyle, { opacity: leftOpacityValue }]} name="thumbs-down" /> }
        {showRightSwipeText && <AnimatedIcon style={[rightIconStyle, { opacity: rightOpacityValue }]} name="thumbs-up" /> }
      </Animated.View>
    )
  }
}
