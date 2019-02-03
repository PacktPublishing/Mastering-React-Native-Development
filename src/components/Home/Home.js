import React from 'react'
import { Container, Content, Form, Item, Input, Button, Text } from 'native-base'

const Home = (props) => {
  return (
    <Container style={{ flex: 1 }}>
      <Content>
        <Form>
          <Item>
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
        <Button onPress={props.setCredentials}>
          <Text>Submit</Text>
        </Button>
        <Button onPress={props.getCredentials}>
          <Text>Get Password</Text>
        </Button>
      </Content>
    </Container>
  )
}

export default Home