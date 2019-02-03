import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Keychain from 'react-native-keychain'
import * as homeActions from './actions'
import Home from './Home'

class HomeContainer extends Component {
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
    this.props.homeActions.saveCredentials(this.state.username, this.state.password)
  }

  getCredentials = async () => {
    const password = await Keychain.getGenericPassword()
    console.log('password', password)
  }

  render () {
    return (
      <Home
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
  return state.Home
}

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  }
}

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(HomeContainer)

export { ConnectedHome as Home }