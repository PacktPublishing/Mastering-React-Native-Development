import React from 'react'
import { Image, Dimensions } from 'react-native'
import {
  Text,
  Card,
  CardItem,
  Left,
  Body,
  Thumbnail,
} from 'native-base'

import ProgressiveImage from './ProgressiveImage'

const ImageCard = ({ card, onCardLayout }) => {
  const { width } = Dimensions.get('window')
  const imageHeight = (card.imageHeight / card.imageWidth) * width
  return (
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
        <ProgressiveImage
          thumbnailSource={{ uri: card.previewURL }}
          source={{ uri: card.largeImageURL }}
          style={{ height: imageHeight, width: null, flex: 1 }}
          resizeMode="contain"
        />
      </CardItem>
    </Card>
  )
}

export default ImageCard