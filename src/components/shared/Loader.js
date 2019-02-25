import React, { Component } from 'react'
import { Container, Content, Spinner } from 'native-base'

export default class Loader extends Component {
  render() {
    return (
      <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Spinner />
        </Content>
      </Container>
    );
  }
}