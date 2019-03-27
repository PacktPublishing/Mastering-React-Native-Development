import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, Button } from 'native-base'

import Welcome from './Welcome'
import * as welcomeActions from './actions'
import { logoutUser } from '../../utils'

class WelcomeContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    const onPressFunc = params ? params.logoutFunction : null
    return {
      title: 'Welcome',
      headerLeft: (
        <Button small style={{ alignSelf: 'center' }} flex={1} onPress={onPressFunc}>
          <Text>Logout</Text>
        </Button>
      ),
    }
  }

  componentDidMount () {
    this.props.navigation.setParams({ logoutFunction: this.logout })
    // Always get the first page of images on mount
    this.props.welcomeActions.getImages(1)
  }

  logout = () => {
    logoutUser(this.props.navigation)
  }

  onEndReached = () => {
    const { fetchingImages, page } = this.props.imageState
    if (!fetchingImages) {
      this.props.welcomeActions.getImages(page + 1)
    }
  }

  render() {
    return (
      <Welcome
        {...this.props.appState}
        {...this.props.imageState}
        getImages={this.props.welcomeActions.getImages}
        onEndReached={this.onEndReached}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    appState: state.App,
    imageState: state.Welcome,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    welcomeActions: bindActionCreators(welcomeActions, dispatch)
  }
}

const ConnectedWelcome = connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer)

export { ConnectedWelcome as Welcome }

