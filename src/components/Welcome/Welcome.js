import { createBottomTabNavigator, createStackNavigator, Header } from 'react-navigation'

import { AccountScreen } from './Account'
import { CardFeed } from './CardFeed'

const FeedStack = createStackNavigator(
  {
    CardFeed: {
      screen: CardFeed,
      navigationOptions: {
        headerTitle: "News Feed"
      }
    },
  },
  {
    navigationOptions: {
      header: props => <Header {...props} />,
    }
  }
)

const AccountStack = createStackNavigator(
  {
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        headerTitle: "My Account"
      }
    },
  },
  {
    navigationOptions: {
      header: props => <Header {...props} />,
    }
  }
)

const TabNavigator = createBottomTabNavigator({
  Feed: FeedStack,
  Account: AccountStack
},
{
  initialRouteName: 'Feed',
  tabBarOptions: {
    activeTintColor: "#F49B42",
    inactiveTintColor: "#858585",
    labelStyle: {
      fontSize: 20,
      lineHeight: 24,
    }
  }
})

export default TabNavigator