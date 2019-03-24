import * as c from './constants'
import Config from 'react-native-config'
import qs from 'qs'
import preLoadedImageResponse from './response'

const getImagesStart = () => ({
  type: c.GET_IMAGES_START
})

const getImagesSuccess = (imageObject) => ({
  type: c.GET_IMAGES_SUCCESS,
  imageObject,
})

const getImagesError = (error) => ({
  type: c.GET_IMAGES_ERROR,
  error,
})

export const getImages = () => async (dispatch) => {
  dispatch(getImagesStart())
  try {
    const params = {
      key: Config.PIXABAY_KEY,
      'image_type': 'photo',
    }
    // This query will look like this: key=ABC123&image_type=photo
    const query = `https://pixabay.com/api?${qs.stringify(params)}`
    // Get the images from the pixabay server
    const imageResponse = await fetch(query)
    // convert the response to a JSON object
    const imageObject = await imageResponse.json()

    // This line of code allows you to not hit the API on every load.
    // const imageObject = preLoadedImageResponse
    
    dispatch(getImagesSuccess(imageObject))

  } catch (error) {
    dispatch(getImagesError(error))
  }
}
