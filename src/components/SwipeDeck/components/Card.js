import React from 'react'
import { Animated } from 'react-native'
import { Icon } from 'native-base'

export default class Card extends React.PureComponent {
  render() {
    const { panResponder, cardRotationValue, xValue, cardStyle, cardOpacity, leftIconStyle, rightIconStyle, showLeftSwipeText, showRightSwipeText } = this.props
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
        { showLeftSwipeText && <Icon style={leftIconStyle} name="thumbs-up" /> }
        { showRightSwipeText && <Icon style={rightIconStyle} name="thumbs-down" /> }
      </Animated.View>
    )
  }
}
