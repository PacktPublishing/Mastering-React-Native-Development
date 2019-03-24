import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Welcome from './Welcome'
import * as welcomeActions from './actions'
import { logoutUser } from '../../utils'

class WelcomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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

