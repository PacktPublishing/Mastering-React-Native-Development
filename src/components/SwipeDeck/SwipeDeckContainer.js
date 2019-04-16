import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SwipeDeck from './SwipeDeck'
import { selectors , actions } from '../Welcome/CardFeed'

class SwipeDeckContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardIdx: 0,
    }
  }

  componentDidMount () {
    this.props.cardFeedActions.getImages(1, 'vertical')
  }

  incrementIdx = () => this.setState({ cardIdx: this.state.cardIdx + 1 })

  render() {
    return (
      <SwipeDeck
        {...this.state}
        cardIds={this.props.imageIds}
        imageObjects={this.props.imageObjects}
        incrementIdx={this.incrementIdx}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    appState: state.App,
    imageObjects: state.CardFeed.imageObjects,
    imageIds: selectors.getVisibleImages(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cardFeedActions: bindActionCreators(actions, dispatch)
  }
}

const ConnectedSwipeDeckContainer = connect(mapStateToProps, mapDispatchToProps)(SwipeDeckContainer)

export { ConnectedSwipeDeckContainer as SwipeDeck }
