import React, { Component } from 'react'
import { connect } from 'react-redux'

import Welcome from './Welcome'
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
        {...this.props}
        logout={this.logout}
      />
    )
  }
}

const mapStateToProps = state => {
  return state.App
}

const mapDispatchToProps = dispatch => {
  return {}
}

const ConnectedWelcome = connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer)

export { ConnectedWelcome as Welcome }

