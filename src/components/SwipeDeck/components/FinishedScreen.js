import React from 'react'
import { StyleSheet, Animated, Easing } from 'react-native'
import { Container, Icon, Text } from 'native-base'

import { SCREEN_TRANSITION_LENGTH } from '../../../Navigator'

export default class FinishedScreen extends React.PureComponent {
  viewFadeValue = new Animated.Value(0)

  componentDidMount () {
    Animated.timing(this.viewFadeValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.in(Easing.circle),
      delay: SCREEN_TRANSITION_LENGTH,
      useNativeDriver: true,
    }).start()
  }

  render() {
    return (
      <Container style={styles.container}>
        <Animated.View style={[styles.iconContainer, { opacity: this.viewFadeValue }]}>
          <Icon name="checkmark-circle-outline" style={styles.icon} />
          <Text>Go back to see more images</Text>
        </Animated.View>
      </Container>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      fontSize: 100,
    },
    iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  }
)