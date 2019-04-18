import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withNavigationFocus } from 'react-navigation'

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
    this.props.cardFeedActions.getImages(this.props.page || 1, 'vertical')
  }

  componentDidUpdate (prevProps) {
    if (!this.props.fetchingImages && this.props.imageIds.length === this.state.cardIdx && prevProps.isFocused) {
      this.props.navigation.navigate('Finished')
    } else if (!prevProps.isFocused && this.props.isFocused) {
      this.props.cardFeedActions.getImages(this.props.page + 1, 'vertical')
    }
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
    fetchingImages: state.CardFeed.fetchingImages,
    page: state.CardFeed.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cardFeedActions: bindActionCreators(actions, dispatch)
  }
}

const ConnectedSwipeDeckContainer = connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(SwipeDeckContainer))

export { ConnectedSwipeDeckContainer as SwipeDeck }
