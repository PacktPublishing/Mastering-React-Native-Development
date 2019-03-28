import React from 'react'
import { Image } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'

const Account = (props) => {
  console.log(props)
  const { facebookUser, logout } = props
  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
          {facebookUser.picture ?
            <Image
              source={{ uri: facebookUser.picture.data.url }}
              style={{ height: facebookUser.picture.data.height, width: facebookUser.picture.data.width }} /> : null }
          <Text style={{ marginTop: 10, fontSize: 20 }}>Welcome, {facebookUser.name}</Text>
        </Container>
        <Container>
          <Button flex={1} onPress={logout} style={{ alignSelf: 'center' }}>
            <Text>Logout</Text>
          </Button>
        </Container>
      </Content>
    </Container>
  )
}

export default Account