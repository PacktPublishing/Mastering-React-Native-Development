import React from 'react'
import { FlatList } from 'react-native'
import { Container, Content, Text, Body, ListItem } from 'native-base'
import Loader from '../shared/Loader'

import ImageCard from './ImageCard'

const renderItem = ({ item }) => {
  return (
    <ListItem key={item.id.toString()} style={{ borderBottomWidth: 0 }}>
      <Body>
        <ImageCard card={item} />
      </Body>
    </ListItem>
  )
}

const Welcome = (props) => {
  return (
    <Container style={{ flex: 1 }}>
      <Content>
      { props.fetchingImages ?
          <Loader /> :
          props.imageError ?
            <Text style={{ alignSelf: 'center' }}>Image Error</Text> :
            props.images.length > 0 ?
              <FlatList
                style={{flex: 1}}
                data={props.images}
                renderItem={renderItem}
              /> :
              null
      }
      </Content>
    </Container>
  )
}

export default Welcome
