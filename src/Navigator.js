import { createStackNavigator, createAppContainer } from 'react-navigation'

import { Login, Welcome, SwipeDeck } from './components'

const SignedInView = createStackNavigator(
  {
    Welcome: {
      screen: Welcome
    },
    SwipeDeck: {
      screen: SwipeDeck
    }
  },
  {
    initialRouteName: "SwipeDeck",
    headerMode: 'none',
  }
)

const SignedOutView = createStackNavigator(
  {
    Login: {
      screen: Login
    }
  },
  {
    initialRouteName: "Login",
    headerMode: 'none',
  }
)

export const createAppNavigator = (signedIn = false) => {
  const appStackNavigator = createStackNavigator(
    {
      SignedIn: {
        screen: SignedInView
      },
      SignedOut: {
        screen: SignedOutView
      },
    },
    {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
      headerMode: 'none',
    }
  )
  return createAppContainer(appStackNavigator)
}
