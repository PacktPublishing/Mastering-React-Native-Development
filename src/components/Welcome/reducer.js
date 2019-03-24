import * as c from './constants'

const initialState = {
  fetchingImages: false,
  images: [],
  imageError: null,
}

const actionHandlers = {
  [c.GET_IMAGES_START]: (state, action) => {
    return {
      ...state,
      fetchingImages: true,
    }
  },
  [c.GET_IMAGES_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetchingImages: false,
      images: action.imageObject.hits,
      imageError: null,
    }
  },
  [c.GET_IMAGES_ERROR]: (state, action) => {
    return {
      ...state,
      fetchingImages: false,
      imageError: action.error,
    }
  }
}

export default (state = initialState, action) => {
  if (actionHandlers[action.type]) {
    return actionHandlers[action.type](state, action)
  }
  return state
}
