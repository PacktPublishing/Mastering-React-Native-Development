import React, { Component } from "react"
import { connect } from 'react-redux'
import { createStackNavigator, createAppContainer } from "react-navigation"

import { Home } from './components/Home'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
  },
  {
    initialRouteName: "Home"
  }
)

export default AppNavigator

// New in React-Navigation 3, you have to create an AppContainer around the navigator
// const AppContainer = createAppContainer(AppNavigator)

// class AppNavigation extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render () {
//     return <AppContainer screenProps={this.props} />
//   }
// }
// export default connect()(AppNavigation);
