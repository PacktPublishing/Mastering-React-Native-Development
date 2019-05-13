import React from 'react'
import { Dimensions } from 'react-native'
import {
  Text,
  Card,
  CardItem,
  Left,
  Body,
  Thumbnail,
  Button,
  Icon,
} from 'native-base'

import ProgressiveImage from './ProgressiveImage'

const { width } = Dimensions.get('window')

class ImageCard extends React.PureComponent {
  render() {
    const { card } = this.props
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
        <CardItem>
          <Left>
            <Button transparent>
              <Icon name="thumbs-up" />
              <Text>{card.likes.toString()} Likes</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
    )
  }
}

export default ImageCard