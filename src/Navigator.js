import { createStackNavigator, createAppContainer } from "react-navigation"

import { Login } from './components/Login'

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
  },
  {
    initialRouteName: "Login"
  }
)

// New in React-Navigation 3, you have to create an AppContainer around the navigator
const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
