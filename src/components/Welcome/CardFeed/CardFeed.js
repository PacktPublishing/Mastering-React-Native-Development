import React from 'react'
import { FlatList } from 'react-native'
import { Container, Text, Body, ListItem } from 'native-base'
import Loader from '../../shared/Loader'

import ImageCard from './ImageCard'

const renderItem = ({ item }) => {
  return (
    <ListItem style={{ borderBottomWidth: 0 }}>
      <Body>
        <ImageCard card={item} />
      </Body>
    </ListItem>
  )
}

const _keyExtractor = (item) => item.id.toString()

const CardFeed = (props) => {
  return (
    <Container style={{ flex: 1 }}>
      {props.fetchingImages && props.images.length <= 0 ?
        <Loader /> :
        props.imageError ?
          <Text style={{ alignSelf: 'center' }}>Image Error</Text> :
          props.images.length > 0 ?
            <FlatList
              keyExtractor={_keyExtractor}
              style={{flex: 1}}
              data={props.images}
              renderItem={renderItem}
              onEndReached={props.onEndReached}
              onEndReachedThreshold={5}
            /> :
            null
      }
    </Container>
  )
}

export default CardFeed
