import React from 'react'
import { ActivityIndicator, Image } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'

import ImageCard from './ImageCard'

const Welcome = (props) => {
  return (
    <Container style={{ flex: 1 }}>
      <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome, {props.facebookUser.name}</Text>
      </Content>
      <Content>
      { props.fetchingImages ?
          <ActivityIndicator /> :
          props.imageError ?
            <Text style={{ alignSelf: 'center' }}>Image Error</Text> :
            props.images.length > 0 ?
              <ImageCard card={props.images[0]} /> :
        null
      }
      </Content>
      <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'space-around' }}>
        <Button style={{ alignSelf: 'center' }} flex={1} onPress={props.getImages}>
          <Text>Get Images</Text>
        </Button>
        <Button style={{ alignSelf: 'center' }} flex={1} onPress={props.logout}>
          <Text>Logout</Text>
        </Button>
      </Content>
    </Container>
  )
}

export default Welcome
