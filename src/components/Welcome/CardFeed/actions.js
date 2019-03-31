import * as c from './constants'
import Config from 'react-native-config'
import qs from 'qs'
import { normalize, schema } from 'normalizr'

import preLoadedImageResponse from './response'
import jResponse from './response-jeopardy'

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

    /*
    [
      ...,
      {
        ...
        "likes":64,
        "id":4087361,
        "user_id":3764790,
        ...
      },
      {
        ...
        "likes":46,
        "id":4087360,
        "user_id":3764790,
        ...
      },
      ...,
    ]
    */

    const image = new schema.Entity('images', {}, {
      idAttribute: 'id' // By default, the idAttirbute is id
    })
    /*
      const image = new schema.Entity('images')
    */
    const imageListSchema = [ image ] // Shorthand for new schema.Array(image)

    // This line of code allows you to not hit the API on every load.
    // const imageObject = preLoadedImageResponse
    
    const normalizedImages = normalize(imageObject.hits, imageListSchema)
    
    console.log('normalizedImages', normalizedImages)
    
    dispatch(getImagesSuccess(normalizedImages, page))

  } catch (error) {
    dispatch(getImagesError(error))
    console.error(error)
  }
}

export const normalizeJQuestions = () => {
  /*
  A single Jeopardy respons from http://jservice.io/api/random?count=20 looks like this:
  [
    {
      "id": 33893,
      "answer": "Mekong",
      "question": "2 deltas that saw a lot of action were the Red & this river, originating in Tibet & emptying in the S. China Sea",
      "value": 400,
      "airdate": "1998-10-01T12:00:00.000Z",
      "created_at": "2014-02-11T23:05:55.618Z",
      "updated_at": "2014-02-11T23:05:55.618Z",
      "category_id": 3968,
      "game_id": null,
      "invalid_count": null,
      "category": {
          "id": 3968,
          "title": "the vietnam war",
          "created_at": "2014-02-11T23:05:55.198Z",
          "updated_at": "2014-02-11T23:05:55.198Z",
          "clues_count": 16
      }
    }
  ]
  */

  // Start with the embedded category object
  const categorySchema = new schema.Entity('categories')
  // Create the entire question object schema
  const questionSchema = new schema.Entity('questions', {
    category: categorySchema
  })
  // Since the response isn't a single object, and is an array instead, use the array shorthand to create an array schema.
  const questionsArraySchema = [ questionSchema ]

  // Normalize the Jeopardy question data
  const jNormalizedData = normalize(jResponse, questionsArraySchema)
  console.log(jNormalizedData)
  return {
    type: 'JEOPARDY_RESPONSE',
    categories: jNormalizedData.entities.categories,
    questions: jNormalizedData.entities.questions,
    questionsArray: jNormalizedData.result,
  }
}