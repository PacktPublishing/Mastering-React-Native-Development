import React from 'react'
import { Container, Content, Text, Button } from 'native-base'

const Welcome = (props) => {
  return (
    <Container style={{ flex: 1 }}>
      <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome, {props.facebookUser.name}</Text>
      </Content>
      <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button flex={1} onPress={props.logout}>
          <Text>Logout</Text>
        </Button>
      </Content>
    </Container>
  )
}

export default Welcome
