import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Keychain from 'react-native-keychain'
import * as loginActions from './actions'
import Login from './Login'

class LoginContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  setUsername = (username) => {
    this.setState({ username })
  }
  
  setPassword = (password) => {
    this.setState({ password })
  }

  setCredentialsLocal = () => {
    const userNameFromState = this.state.username
    const passwordFromState = this.state.password
    this.props.loginActions.saveCredentials(userNameFromState, passwordFromState)
    this.setState({
      username: '',
      password: '',
    })
  }

  getCredentials = async () => {
    const password = await Keychain.getGenericPassword()
    console.log('password', password)
  }

  render () {
    return (
      <Login
        {...this.props}
        getCredentials={this.getCredentials}
        setUsername={this.setUsername}
        setPassword={this.setPassword}
        setCredentials={this.setCredentialsLocal}
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
