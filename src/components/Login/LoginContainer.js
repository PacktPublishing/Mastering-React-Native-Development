import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavigationActions, StackActions } from 'react-navigation'

import * as loginActions from './actions'
import Login from './Login'

class LoginContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggingIn && !this.props.loggingIn) {
      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'SignedIn' })
        ]
      })
      this.props.navigation.dispatch(resetAction)
    }
  }

  render() {
    return (
      <Login
        {...this.props}
        loginWithFacebook={this.props.loginActions.loginWithFacebook}
        loginError={this.props.loginError}
        settingPasswordError={this.props.settingPasswordError}
      />
    )
  }
}

const mapStateToProps = state => {
  return state.Login
}

const mapDispatchToProps = dispatch => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginContainer)

export { ConnectedLogin as Login }

