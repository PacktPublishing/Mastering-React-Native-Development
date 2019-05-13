import React, { Component } from 'react'
import { Linking, Platform } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CardFeed from './CardFeed'
import * as cardFeedActions from './actions'
import { logoutUser } from '../../../utils'
import { getVisibleImages } from './selectors'

class CardFeedContainer extends Component {
  async componentDidMount () {
    if (Platform.OS === 'android') {
      const initialUrl = await Linking.getInitialURL()
      if (initialUrl) this.navigate(initialUrl)
    } else {
      Linking.addEventListener('url', this.handleOpenURL)
    }
    this.props.navigation.setParams({ logoutFunction: this.logout })
    // Always get the first page of images on mount
    this.props.cardFeedActions.getImages(1)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL)
  }

  handleOpenURL = (event) => {
    this.navigate(event.url)
  }

  navigate = (url) => {
    const { navigate } = this.props.navigation
    const route = url.replace(/.*?:\/\//g, '')
    const uuid = route.match(/\/([^\/]+)\/?$/)[1]
    const routeName = route.split('/')[0]

    if (routeName === 'Card' && uuid) {
      navigate(routeName, { uuid })
    }
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

  onCardPress = (card) => {
    this.props.navigation.navigate('Card', { card })
  }

  render() {
    return (
      <CardFeed
        {...this.props.appState}
        {...this.props.imageState}
        getImages={this.props.cardFeedActions.getImages}
        onEndReached={this.onEndReached}
        onCardLikeToggle={this.props.cardFeedActions.onCardLikeToggle}
        onCardPress={this.onCardPress}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    appState: state.App,
    imageState: {
      imageObjects: state.CardFeed.imageObjects,
      fetchingImages: state.CardFeed.fetchingImages,
      imageError: state.CardFeed.imageError,
      cardLikeToggleValue: state.CardFeed.cardLikeToggleValue,
      page: state.CardFeed.page,
      imageIds: getVisibleImages(state),
    },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cardFeedActions: bindActionCreators(cardFeedActions, dispatch)
  }
}

const ConnectedCardFeed = connect(mapStateToProps, mapDispatchToProps)(CardFeedContainer)

export { ConnectedCardFeed as CardFeed }

