import React from 'react'
import { Image } from 'react-native'
import {
  Text,
  Card,
  CardItem,
  Left,
  Body,
  Thumbnail,
} from 'native-base'

const ImageCard = ({ card }) => (
  <Card>
    <CardItem>
      <Left>
        <Thumbnail source={{ uri: card.userImageURL }} />
        <Body>
          <Text>{card.user}</Text>
        </Body>
      </Left>
    </CardItem>
    <CardItem cardBody>
      <Image
        source={{ uri: card.largeImageURL }}
        // resizeMode="contain"
        style={{ height: 200, width: null, flex: 1 }}
      />
    </CardItem>
  </Card>
)

export default ImageCard