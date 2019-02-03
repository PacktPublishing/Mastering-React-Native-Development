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

// New in React-Navigation 3, you have to create an AppContainer around the navigator
const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
