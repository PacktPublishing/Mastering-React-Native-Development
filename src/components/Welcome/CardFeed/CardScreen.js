import React from 'react'
import { Image } from 'react-native'
import { Container } from 'native-base'


class CardScreen extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      loading : true,
      card: {},
    }
  }

  async componentDidMount () {
    const { card, uuid } = this.props.navigation.state.params
    this.setState({
      loading: false,
      imageUri: card ? card.largeImageURL : `https://pixabay.com/get/${uuid}.jpg`
    })
  }

  render () {
    const { imageUri, loading } = this.state
    return (
      <Container>
          {!loading &&
            <Image
              source={{ uri: imageUri }}
              resizeMode="contain"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          }
      </Container>
    )
  }
}

export default CardScreen
