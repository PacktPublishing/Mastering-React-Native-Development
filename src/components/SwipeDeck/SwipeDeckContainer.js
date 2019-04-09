import React, { Component } from 'react'
import { Animated, Dimensions, PanResponder } from 'react-native'

import SwipeDeck from './SwipeDeck'

const DEVICE_WIDTH = Dimensions.get('window').width
class SwipeDeckContainer extends Component {
  xValue = new Animated.Value(0)
  cardOpacity = new Animated.Value(1)
  // This is the value of where your finger/cursor starts moving the card
  cardMoveFingerX = 0

  constructor(props) {
    super(props)
    this.state = {
      showRightSwipeText: false,
      showLeftSwipeText: false,
    }

    this._panResponder = PanResponder.create(
      {
        // Does this view want to become responder on the start of a touch?
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        // When a parent wants to become the touch responder
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        // does this view want to "claim" touch responsiveness?
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          this.cardMoveFingerX = gestureState.moveX
          return true
        },
        // When a parent wants to become the move responder
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
        // The user is moving their finger
        onPanResponderMove: this.onPanResponderMove,
        // Fired at the end of the touch, ie "touchUp"
        onPanResponderRelease: this.onPanResponderRelease,
      })
  }
  
  onPanResponderMove = (evt, gestureState) => {
    // Negative value of halfway between your finger and the left edge of the screen
    const leftValue = -(this.cardMoveFingerX / 2)
    // halfway between your finger and the right edge of the screen
    const rightValue = (DEVICE_WIDTH - this.cardMoveFingerX) / 2
    // Update the X Value when the user swipes
    this.xValue.setValue(gestureState.dx)
    // When the change in x is positive and larger than halfway between your finger and the edge of the screen, show label
    if (gestureState.dx > 0 && gestureState.dx > rightValue) {
      this.setState({ showRightSwipeText: true, showLeftSwipeText: false })
    // When the change in x is negative and less than the negative value of halfway between your finger and the edge of the screen, show label
    } else if (gestureState.dx < 0 && gestureState.dx < leftValue) {
      this.setState({ showLeftSwipeText: true, showRightSwipeText: false })
    }
  }

  onPanResponderRelease = (evt, gestureState) => {
    // Negative value of Three-quarter of the distance between the left edge of screen and your finger
    const leftValue = -((3 * this.cardMoveFingerX) / 4)
    // Three-quarter of the distance between the right edge of screen and your finger
    const rightValue = (3 * (DEVICE_WIDTH - this.cardMoveFingerX)) / 4
    // If the user doesn't swipe far enough left or right set the card back to the middle
    if (gestureState.dx < rightValue && gestureState.dx > leftValue ) {
      this.setState({ showLeftSwipeText: false, showRightSwipeText: false })
      Animated.spring(this.xValue,
        {
          toValue: 0,
          useNativeDriver: true,
        }).start()
    // if the user swipes far enough right call the swipeCards func with a positive multiplier
    } else if (gestureState.dx > rightValue) {
        this.swipeCards(1)
    // if the user swipes far enough left call the swipeCards func with a negative multiplier
    } else if (gestureState.dx < leftValue) {
      this.swipeCards(-1)
    }
  }

  swipeCards = (multiplier) => {
    const widthToUse = multiplier * DEVICE_WIDTH
    Animated.parallel([
      Animated.timing(this.xValue,
      {
        toValue: widthToUse,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(this.cardOpacity,
      {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
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
        {...this.state}
        panResponder={this._panResponder}
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
