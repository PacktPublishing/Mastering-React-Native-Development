import React from 'react'
import { Animated, StyleSheet, Image, Dimensions, PanResponder } from 'react-native'
import { Icon } from 'native-base'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)
const DEVICE_WIDTH = Dimensions.get('window').width
const VIEW_WIDTH = DEVICE_WIDTH * (0.6) * (0.9)
export default class Card extends React.PureComponent {
  xValue = new Animated.Value(0)
  cardOpacity = new Animated.Value(1)
  imageOpacity = new Animated.Value(0)
  // This is the value of where your finger/cursor starts moving the card
  cardMoveFingerX = 0

  constructor(props) {
    super(props)
    this.state = {
      showRightSwipeIcon: false,
      showLeftSwipeIcon: false,
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

  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this)
    }
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
      this.setState({ showRightSwipeIcon: true, showLeftSwipeIcon: false })
      // When the change in x is negative and less than the negative value of halfway between your finger and the edge of the screen, show label
    } else if (gestureState.dx < 0 && gestureState.dx < leftValue) {
      this.setState({ showLeftSwipeIcon: true, showRightSwipeIcon: false })
    } else {
      this.setState({ showLeftSwipeIcon: false, showRightSwipeIcon: false })
    }
  }

  onPanResponderRelease = (evt, gestureState) => {
    // Negative value of Three-quarter of the distance between the left edge of screen and your finger
    const leftValue = -((3 * this.cardMoveFingerX) / 4)
    // Three-quarter of the distance between the right edge of screen and your finger
    const rightValue = (3 * (DEVICE_WIDTH - this.cardMoveFingerX)) / 4
    // If the user doesn't swipe far enough left or right set the card back to the middle
    if (gestureState.dx < rightValue && gestureState.dx > leftValue) {
      this.setState({ showLeftSwipeIcon: false, showRightSwipeIcon: false })
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
    this.props.incrementIdx()
  }

  onRightButtonClicked = () => {
    this.setState({ showRightSwipeIcon: true })
    this.swipeCards(1)
  }

  onLeftButtonClicked = () => {
    this.setState({ showLeftSwipeIcon: true })
    this.swipeCards(-1)
  }

  onImageLoad = () => {
    Animated.timing(this.imageOpacity, {
      toValue: 1,
      duration: 200,
    }).start()
  }

  setCardRef = ref => this.card = ref

  render() {
    const { card } = this.props
    const { showLeftSwipeIcon, showRightSwipeIcon } = this.state

    const imageHeight = (card.imageHeight / card.imageWidth) * VIEW_WIDTH
    const cardRotationValue = this.xValue.interpolate(
      {
        inputRange: [-DEVICE_WIDTH, 0, DEVICE_WIDTH],
        outputRange: ['-20deg', '0deg', '20deg'],
      }
    )
    const leftOpacityValue = this.xValue.interpolate(
      {
        inputRange: [-((3 * this.cardMoveFingerX) / 4), -(this.cardMoveFingerX / 2)],
        outputRange: [1, 0]
      }
    )
    const rightOpacityValue = this.xValue.interpolate(
      {
        inputRange: [(DEVICE_WIDTH - this.cardMoveFingerX) / 2, (3 * (DEVICE_WIDTH - this.cardMoveFingerX)) / 4],
        outputRange: [0, 1]
      }
    )
    return (
      <Animated.View
        ref={this.setCardRef}
        {...this._panResponder.panHandlers}
        style={[
          styles.card,
          {
            opacity: this.cardOpacity,
            transform: [
              { translateX: this.xValue },
              { rotate: cardRotationValue }
            ]
          }
        ]}
      >
        {showLeftSwipeIcon && <AnimatedIcon style={[styles.leftIcon, { opacity: leftOpacityValue }]} name="thumbs-down" /> }
        {showRightSwipeIcon && <AnimatedIcon style={[styles.rightIcon, { opacity: rightOpacityValue }]} name="thumbs-up" /> }
        
        <Animated.Image
          source={{ uri: card.largeImageURL }}
          style={[styles.image, { height: imageHeight, opacity: this.imageOpacity }]}
          resizeMode="contain"
          onLoad={this.onImageLoad}
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
    backgroundColor: 'white',
  },
  leftIcon: {
    position: 'absolute',
    top: 20,
    right: 30,
    color: '#777777',
    fontSize: 30,
    backgroundColor: 'transparent'
  },
  rightIcon: {
    position: 'absolute',
    top: 20,
    left: 30,
    color: '#777777',
    fontSize: 30,
    backgroundColor: 'transparent'
  },
  image: {
    width: VIEW_WIDTH,
    flex: 1
  }
})