import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, Button } from 'native-base'

import CardFeed from './CardFeed'
import * as cardFeedActions from './actions'
import { logoutUser } from '../../../utils'

class CardFeedContainer extends Component {
  componentDidMount () {
    this.props.navigation.setParams({ logoutFunction: this.logout })
    // Always get the first page of images on mount
    this.props.cardFeedActions.getImages(1)
  }

  logout = () => {
    logoutUser(this.props.navigation)
  }

  onEndReached = () => {
    const { fetchingImages, page } = this.props.imageState
    if (!fetchingImages) {
      this.props.cardFeedActions.getImages(page + 1)
    }
  }

  render() {
    return (
      <CardFeed
        {...this.props.appState}
        {...this.props.imageState}
        getImages={this.props.cardFeedActions.getImages}
        onEndReached={this.onEndReached}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    appState: state.App,
    imageState: state.CardFeed,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cardFeedActions: bindActionCreators(cardFeedActions, dispatch)
  }
}

const ConnectedCardFeed = connect(mapStateToProps, mapDispatchToProps)(CardFeedContainer)

export { ConnectedCardFeed as CardFeed }

