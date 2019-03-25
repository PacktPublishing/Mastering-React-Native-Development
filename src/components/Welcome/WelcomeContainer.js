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

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.navigation.setParams({ logoutFunction: this.logout })
    this.props.welcomeActions.getImages()
  }

  logout = () => {
    logoutUser(this.props.navigation)
  }

  render() {
    return (
      <Welcome
        {...this.props.appState}
        {...this.props.imageState}
        logout={this.logout}
        getImages={this.props.welcomeActions.getImages}
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

