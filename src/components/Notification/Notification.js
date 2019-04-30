import React from 'react'
import { Container, Content, Text, Button } from 'native-base'

const Notification = ({ displayNotification }) => {
  return (
    <Container style={{ flex: 1 }}>
      <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Notification Listener</Text>
          <Button onPress={displayNotification}>
            <Text>Display Notification</Text>
          </Button>
        </Content>
      </Container>
    </Container>
  )
}

export default Notification 