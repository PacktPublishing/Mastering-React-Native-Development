import React, { Component } from 'react'
import { connect } from 'react-redux'

import Account from './Account'
import { logoutUser } from '../../../utils'

class AccountContainer extends Component {
  logout = () => {
    logoutUser(this.props.navigation)
  }

  render() {
    return (
      <Account
        {...this.props}
        logout={this.logout}
      />
    )
  }
}

const mapStateToProps = state => {
  return state.App
}

const ConnectedAccount = connect(mapStateToProps, null)(AccountContainer)

export { ConnectedAccount as AccountScreen }
