import React, { Component } from 'react'
import { Platform } from 'react-native'
import firebase from 'react-native-firebase'

import Notification from './Notification'

const ANDROID_CHANNEL_ID = 'test_channel_id'
class NotificationContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    const fcmToken = await firebase.messaging().getToken()
    if (fcmToken) {
      const enabled = await firebase.messaging().hasPermission()
        if (enabled) {
          this.notificationListener = firebase.notifications().onNotification((notification) => {
            console.log('notificationListener', notification)
            this.routeUserFromNotification(notification)
          })
          this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            // Get information about the notification that was opened
            const notification = notificationOpen.notification
            this.routeUserFromNotification(notification)
          })
          
          // Build a channel
          if (Platform.OS === 'android') {
            const channel = new firebase.notifications.Android.Channel(ANDROID_CHANNEL_ID, 'Test Channel', firebase.notifications.Android.Importance.Max)
              .setDescription('My apps test channel')

            // Create the channel
            firebase.notifications().android.createChannel(channel)
          }
        } else {
          // user doesn't have permission
        }
    } else {
      // user doesn't have a device token yet
    }
  }

  

  routeUserFromNotification = (notification) => {
    const { data } = notification
    if (data && data.route) {
      this.props.navigation.navigate(data.route, { ...data })
    }
  }

  componentWillUnmount() {
    this.notificationOpenedListener()
    this.notificationListener()
  }

  displayNotification() {
    const notification = new firebase.notifications.Notification()
      .setNotificationId('notificationId')
      .setTitle('Button Clicked!')
      .setBody('You clicked the button and got this notification')
      .setData({
        route: 'Welcome',
        meow: 'woof',
      })
      .setSound(firebase.notifications.Android.Defaults.Sound)
      .android.setChannelId(ANDROID_CHANNEL_ID)
      .android.setPriority(firebase.notifications.Android.Priority.High)

    firebase.notifications().displayNotification(notification)
  }

  render() {
    return (
      <Notification
        displayNotification={this.displayNotification}
      />
    )
  }
}

export default NotificationContainer

