import React from 'react'
import { View } from 'react-native'
import { Container, Content, Form, Item, Input, Button, Text, Spinner } from 'native-base'

const Home = (props) => {
  console.log(props)
  return (
    <Container style={{ flex: 1 }}>
      <Container style={{flex: 1}} />
      <Container style={{ flex: 3 }}>
        <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
          {props.settingPassword ?
            <Spinner /> :
            <Form>
              <Item style={{ width: '100%' }}>
                <Input
                  onChangeText={props.setUsername}
                  placeholder="Username"
                />
              </Item>
              <Item last>
                <Input
                  secureTextEntry
                  onChangeText={props.setPassword}
                  onSubmitEditing={props.setCredentials}
                  placeholder="Password"
                />
              </Item>
            </Form>
          }
          <Button flex={1} onPress={props.setCredentials}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
      <Container style={{ flex: 2 }}>
        <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
          {props.settingPasswordError && <Text syle={{ flex: 1, fontSize: 20 }}>{props.settingPasswordError}</Text>}
          {props.username.length > 0 &&
            <Button flex={1} onPress={props.getCredentials}>
              <Text>Get Password</Text>
            </Button>
          }
        </Content>
      </Container>
    </Container>
  )
}

export default Home