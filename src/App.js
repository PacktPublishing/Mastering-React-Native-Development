import React, {Component} from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { createAppNavigator } from './Navigator'
import reduxStore from './store'
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
        <Provider store={reduxStore.store}>
          <PersistGate loading={<Loader />} persistor={reduxStore.persistor}>
            <Navigator />
          </PersistGate>
        </Provider>
      )
    } else {
      return <Loader />
    }
  }
}
