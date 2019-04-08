import React from 'react'
import { Animated } from 'react-native'

export default class Card extends React.PureComponent {
  render() {
    return (
      <Animated.View
        style={[
          this.props.cardStyle,
          {
            opacity: this.props.cardOpacity,
            transform: [
              { translateX: this.props.xValue },
              { rotate: this.props.cardRotationValue }
            ]
          }
        ]}
      >
      </Animated.View>
    )
  }
}
