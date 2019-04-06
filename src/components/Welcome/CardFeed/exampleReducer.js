import * as c from './constants'
import produce from 'immer'

const initialState = {
  fetchingImages: false,
  images: {
    newImageIds: [],
    seenImageIds: [],
    imageObjects: {},
  },
  imageError: null,
  page: 1,
  cardLikeToggleValue: false,
}

/* traditional way */
const traditionalActionHandlers = {
  [c.GET_IMAGES_SUCCESS]: (state, action) => {
    const reducedImages = action.newImages.reduce(result, imageId => {
      const image = action.imageObject[imageId]
      // Set image to correct array
      if (image.new) result.new.push(image)
      else result.seen.push(image)
    }, {
      new: [],
      seen: [],
    })
    return {
      ...state,
      images: {
        ...images,
        newImageIds: [...state.images.newImageIds, ...reducedImages.new],
        seenImageIds: [...state.images.seenImageIds, ...reducedImages.seen],
        imageObjects: Object.assign(state.images.imageObjects, action.imageObject)
      }
    }
  },
}

const immerActionHandler = {
  [c.GET_IMAGES_SUCCESS]: (state, action) => {
    produce(state, draftState => {
      const { images } = draftState
      action.newImages.forEach(imageId => {
        if (image.new) images.newImageIds.push(image)
        else images.seenImageIds.push(image)
        images.imageObjects[imageId] = image
      })
    })
  }
}
