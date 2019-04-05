import * as c from './constants'

const initialState = {
  fetchingImages: false,
  imageObjects: {},
  imageIds: [],
  imageError: null,
  page: 1,
  cardLikeToggleValue: false,
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
      imageObjects: { ...state.imageObjects, ...action.imageObject.entities.images },
      imageIds: [...state.imageIds, ...action.imageObject.result],
      page: action.page,
      imageError: null,
    }
  },
  [c.GET_IMAGES_ERROR]: (state, action) => {
    return {
      ...state,
      fetchingImages: false,
      imageError: action.error,
    }
  },
  [c.ON_CARD_LIKE_TOGGLE]: (state, action) => ({
    ...state,
    cardLikeToggleValue: action.cardLikeToggleValue,
  })
}

export default (state = initialState, action) => {
  if (actionHandlers[action.type]) {
    return actionHandlers[action.type](state, action)
  }
  return state
}
