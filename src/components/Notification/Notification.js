import React from 'react'
import { Container, Content, Text } from 'native-base'

const Notification = () => {
  return (
    <Container style={{ flex: 1 }}>
      <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Notification Listener</Text>
        </Content>
      </Container>
    </Container>
  )
}

export default Notification 