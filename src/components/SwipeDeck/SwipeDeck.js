import React from 'react'
import { View, StyleSheet } from 'react-native'

import { DirectionButton, Card } from './components'

class SwipeDeck extends React.PureComponent {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <DirectionButton onPressFunc={this.props.onLeftButtonClicked} text="<" />
        </View>
        <View style={styles.cardContainer}>
          <Card {...this.props} cardStyle={styles.card} leftIconStyle={styles.leftIcon} rightIconStyle={styles.rightIcon} />
        </View>
        <View style={styles.buttonContainer}>
          <DirectionButton onPressFunc={this.props.onRightButtonClicked} text=">" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '95%',
    height: '60%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor:'#cc5500',
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

export default SwipeDeck