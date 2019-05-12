import React from 'react'
import { FlatList } from 'react-native'
import { Container, Text, Body, ListItem, Switch, Content } from 'native-base'
import Loader from '../../shared/Loader'

import ImageCard from './ImageCard'
import shallowEqual from 'react-redux/lib/utils/shallowEqual' 

const _keyExtractor = (item) => item.toString()

class CardFeed extends React.PureComponent {
  renderItem = ({ item }) => {
    const { imageObjects } = this.props
    return (
      <ListItem style={{ borderBottomWidth: 0 }}>
        <Body>
          <ImageCard onCardPress={this.props.onCardPress} card={imageObjects[item]} />
        </Body>
      </ListItem>
    )
  }

  
  render () {
    const {
      fetchingImages,
      imageIds,
      imageError,
      onEndReached,
      onCardLikeToggle,
      cardLikeToggleValue,
    } = this.props
    return (
      <Container style={{ flex: 1 }}>
        <Switch
          onValueChange={onCardLikeToggle}
          value={cardLikeToggleValue}
          style={{ marginLeft: 10, marginTop: 10, marginBottom: 10 }}
        />
        {fetchingImages && imageIds.length <= 0 ?
          <Loader /> :
          imageError ?
            <Text style={{ alignSelf: 'center' }}>Image Error</Text> :
            imageIds.length > 0 ?
              <FlatList
                keyExtractor={_keyExtractor}
                style={{ flex: 1 }}
                data={imageIds}
                renderItem={this.renderItem}
                onEndReached={onEndReached}
                onEndReachedThreshold={5}
              /> :
              null
        }
      </Container>
    )
  }
}

export default CardFeed
