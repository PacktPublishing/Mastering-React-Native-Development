import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as homeActions from './actions'

class Home extends Component {
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
    this.props.homeActions.setCredentials(this.state.username, this.state.password)
  }

  render () {
    return (
      <Home
        setUsername={this.setUsername}
        setPassword={this.setPassword}
        setCredentials={this.setCredentialsLocal}
      />
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  }
}

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home)

export { ConnectedHome as Home }