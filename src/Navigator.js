import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Easing, Animated } from 'react-native'

import {
  Login,
  Welcome,
  SwipeDeck,
  FinishedScreen,
  Notification,
} from './components'

export const SCREEN_TRANSITION_LENGTH = 750

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: SCREEN_TRANSITION_LENGTH,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },

    screenInterpolator: sceneProps => {
      const { position, layout, scene, index } = sceneProps
      const sceneIndex = scene.index
      const height = layout.initHeight
      const width = layout.initWidth

      const translateY = position.interpolate({
        inputRange: [sceneIndex - 1, sceneIndex],
        outputRange: [height, 0]
      })

      const slideFromBottom = { transform: [{ translateY }] }

      return slideFromBottom
    },
  }
}

const SwipeDeckNavigator = createStackNavigator(
  {
    SwipeDeck: {
      screen: SwipeDeck,
      navigationOptions: () => ({ header: null }),
    },
    Finished: {
      screen: FinishedScreen,
    },
  },
  {
    transitionConfig,
  }
)

const SignedInView = createStackNavigator(
  {
    Welcome: {
      screen: Welcome
    },
    SwipeDeckNav: {
      screen: SwipeDeckNavigator,
    },
    Notification: {
      screen: Notification
    },
  },
  {
    initialRouteName: "Notification",
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
