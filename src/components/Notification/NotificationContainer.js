import React, { Component } from 'react'
import firebase from 'react-native-firebase'

import Notification from './Notification'

class NotificationContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    const fcmToken = await firebase.messaging().getToken()
    if (fcmToken) {
      const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
          this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
            console.log('notificationDisplayedListener', notification)
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
          })
          this.notificationListener = firebase.notifications().onNotification((notification) => {
            console.log('notificationListener', notification)
            // Process your notification as required
          })
        } else {
          // user doesn't have permission
        }
    } else {
      // user doesn't have a device token yet
    }
  }

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
  }

  render() {
    return (
      <Notification />
    )
  }
}

export default NotificationContainer

