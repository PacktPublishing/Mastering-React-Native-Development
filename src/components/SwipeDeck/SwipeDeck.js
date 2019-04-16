import React from 'react'
import { View, StyleSheet } from 'react-native'
import produce from 'immer'

import { DirectionButton, Card } from './components'

class SwipeDeck extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      cardRefs: {}
    }
  }

  onRef = (ref, cardId) => {
    this.setState(
      produce(draft => {
        draft.cardRefs[cardId] = ref
      })
    )

    /*
      this.setState({
        cardRefs: Object.assign(
          this.state.cardRefs,
          { [cardId]: ref }
        )
      })
    */
  }

  render () {
    const { cardIds, imageObjects, cardIdx } = this.props
    const { cardRefs } = this.state

    const leftButtonFunc = cardRefs[cardIds[cardIdx]] ? cardRefs[cardIds[cardIdx]].onLeftButtonClicked : null
    const rightButtonFunc = cardRefs[cardIds[cardIdx]] ? cardRefs[cardIds[cardIdx]].onRightButtonClicked : null

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <DirectionButton onPressFunc={leftButtonFunc} text="<" />
        </View>
        <View style={styles.cardContainer}>
          { cardIds.length > 0 &&
            cardIds.map(cardId => (
              <Card
                {...this.props}
                key={cardId}
                card={imageObjects[cardId]}
                onRef={(ref) => this.onRef(ref, cardId)}
              />
            )).reverse()
          }
        </View>
        <View style={styles.buttonContainer}>
          <DirectionButton onPressFunc={rightButtonFunc} text=">" />
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