import React, { Component } from 'react'
import { Animated, Dimensions } from 'react-native'

import SwipeDeck from './SwipeDeck'

const DEVICE_WIDTH = Dimensions.get('window').width

class SwipeDeckContainer extends Component {
  xValue = new Animated.Value(0)
  cardOpacity = new Animated.Value(1)

  swipeCards = (multiplier) => {
    const widthToUse = multiplier * DEVICE_WIDTH
    Animated.parallel([
      Animated.timing(this.xValue,
      {
        toValue: widthToUse,
        duration: 200
      }),
      Animated.timing(this.cardOpacity,
      {
        toValue: 0,
        duration: 200
      })
    ]).start()
  }

  onRightButtonClicked = () => {
    this.swipeCards(1)
  }

  onLeftButtonClicked = () => {
    this.swipeCards(-1)
  }
  
  render() {
    const cardRotationValue = this.xValue.interpolate(
      {
        inputRange: [-DEVICE_WIDTH, 0, DEVICE_WIDTH],
        outputRange: ['-20deg', '0deg', '20deg'],
      }
    )
    return (
      <SwipeDeck
        onLeftButtonClicked={this.onLeftButtonClicked}
        onRightButtonClicked={this.onRightButtonClicked}
        cardRotationValue={cardRotationValue}
        xValue={this.xValue}
        cardOpacity={this.cardOpacity}
      />
    )
  }
}

export { SwipeDeckContainer as SwipeDeck }
