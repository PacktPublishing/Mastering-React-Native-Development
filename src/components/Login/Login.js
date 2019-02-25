import React from 'react'
import { Container, Content, Button, Text } from 'native-base'

const Login = (props) => {
  return (
    <Container style={{ flex: 1 }}>
      <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button flex={1} onPress={props.loginWithFacebook}>
            <Text>Login With Facebook</Text>
          </Button>
        </Content>
      </Container>
      <Container style={{ flex: 1 }}>
        <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
          {props.settingPasswordError && <Text syle={{ flex: 1, fontSize: 20 }}>{props.settingPasswordError}</Text>}
          {props.loginError && <Text syle={{ flex: 1, fontSize: 20 }}>{props.loginError}</Text>}
        </Content>
      </Container>
    </Container>
  )
}

export default Login 