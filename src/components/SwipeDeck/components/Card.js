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
        { showLeftSwipeText && <Icon style={leftIconStyle} name="thumbs-down" /> }
        { showRightSwipeText && <Icon style={rightIconStyle} name="thumbs-up" /> }
      </Animated.View>
    )
  }
}
