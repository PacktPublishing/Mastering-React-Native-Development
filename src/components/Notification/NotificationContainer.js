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
      const enabled = await firebase.messaging().hasPermission()
        if (enabled) {
          this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
            console.log('notificationDisplayedListener', notification)
            this.routeUserFromNotification(notification)
          })
          this.notificationListener = firebase.notifications().onNotification((notification) => {
            console.log('notificationListener', notification)
            this.routeUserFromNotification(notification)
          })
          this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            // Get information about the notification that was opened
            const notification = notificationOpen.notification
            this.routeUserFromNotification(notification)
          });
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

