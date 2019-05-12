import React from 'react'
import { Image } from 'react-native'
import { Content, Container } from 'native-base'
import Config from 'react-native-config'
import qs from 'qs'


class CardScreen extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      loading : true,
      card: {},
    }
  }
  async componentDidMount () {
    const { card, id } = this.props.navigation.state.params
    if (!card) {
      const params = {
        key: Config.PIXABAY_KEY,
        id: id
      }
      // This query will look like this: key=ABC123&image_type=photo
      const query = `https://pixabay.com/api?${qs.stringify(params)}`
      // Get the images from the pixabay server
      const imageResponse = await fetch(query)
      const imageObject = await imageResponse.json()
      const card = imageObject.hits[0]
      this.setState({
        loading: false,
        card,
      })
    } else {
      this.setState({
        loading: false,
        card,
      })
    }
  }

  render () {
    const { card, loading } = this.state
    return (
      <Container>
          {!loading &&
            <Image
              source={{ uri: card.largeImageURL }}
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
