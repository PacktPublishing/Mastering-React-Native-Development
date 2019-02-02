import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input } from 'native-base';

const Home = (props) => {
  return (
    <Container style={{ flex: 1, backgroundColor: 'red' }}>
      <Header />
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
      </Content>
    </Container>
  )
}

export default Home