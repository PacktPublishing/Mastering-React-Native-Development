import React from 'react'
import { Container, Content, Text } from 'native-base'

const Welcome = (props) => {
  return (
    <Container style={{ flex: 1 }}>
      <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome, {props.navigation.state.params.facebookUser.name}</Text>
      </Content>
    </Container>
  )
}

export default Welcome
