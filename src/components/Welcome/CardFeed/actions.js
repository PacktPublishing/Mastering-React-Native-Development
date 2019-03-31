import * as c from './constants'
import Config from 'react-native-config'
import qs from 'qs'
import { normalize, schema } from 'normalizr'
import preLoadedImageResponse from './response'

const getImagesStart = () => ({
  type: c.GET_IMAGES_START
})

const getImagesSuccess = (imageObject, page) => ({
  type: c.GET_IMAGES_SUCCESS,
  imageObject,
  page,
})

const getImagesError = (error) => ({
  type: c.GET_IMAGES_ERROR,
  error,
})

export const getImages = (page) => async (dispatch) => {
  dispatch(getImagesStart())
  try {
    const params = {
      key: Config.PIXABAY_KEY,
      'image_type': 'photo',
      page,
    }
    // This query will look like this: key=ABC123&image_type=photo
    const query = `https://pixabay.com/api?${qs.stringify(params)}`
    // Get the images from the pixabay server
    const imageResponse = await fetch(query)
    // convert the response to a JSON object
    const imageObject = await imageResponse.json()

    const image = new schema.Entity('images', {}, {
      idAttribute: 'id' // By default, the idAttirbute is id
    })
    const imageListSchema = [ image ] // Shorthand for new schema.Array(image)

    // This line of code allows you to not hit the API on every load.
    // const imageObject = preLoadedImageResponse
    
    const normalizedImages = normalize(imageObject.hits, imageListSchema)

    dispatch(getImagesSuccess(normalizedImages, page))

  } catch (error) {
    dispatch(getImagesError(error))
    console.error(error)
  }
}
