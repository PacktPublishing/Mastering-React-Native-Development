import React, {Component} from 'react'
import { Provider } from 'react-redux'

import { createAppNavigator } from './Navigator'
import store from './store'
import { isSignedIn } from './utils'
import Loader from './components/shared/Loader'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userSignedIn: false,
      checkUserSignedIn: false,
    }
  }

  componentDidMount = async () => {
    const userSignedIn = await isSignedIn()
    this.setState( { userSignedIn, checkUserSignedIn: true })
  }

  render () {
    if (this.state.checkUserSignedIn) {
      const Navigator = createAppNavigator(this.state.userSignedIn)
      return (
        <Provider store={store}>
          <Navigator />
        </Provider>
      )
    } else {
      return <Loader />
    }
  }
}
