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
          { this.props.cardIds.length > 0 && 
            <Card
              {...this.props}
              card={this.props.imageObjects[this.props.cardIds[0]]}
            />
          }
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
})

export default SwipeDeck