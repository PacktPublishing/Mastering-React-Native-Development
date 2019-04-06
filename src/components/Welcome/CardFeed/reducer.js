import * as c from './constants'
import produce from 'immer'

const initialState = {
  fetchingImages: false,
  imageObjects: {},
  imageIds: [],
  imageError: null,
  page: 1,
  cardLikeToggleValue: false,
}

const actionHandlers = {
  [c.GET_IMAGES_START]: (draft, action) => {
    draft.fetchingImages = true
  },
  [c.GET_IMAGES_SUCCESS]: (draft, action) => {
    draft.fetchingImages = false
    draft.imageObjects = { ...state.imageObjects, ...action.imageObject.entities.images }
    draft.imageIds = [...state.imageIds, ...action.imageObject.result]
    draft.page = action.page
    draft.imageError = null
  },
  [c.GET_IMAGES_ERROR]: (draft, action) => {
    draft.fetchingImages = false
    draft.imageError = action.error
  },
  [c.ON_CARD_LIKE_TOGGLE]: (draft, action) => {
    draft.cardLikeToggleValue = action.cardLikeToggleValue
  }
}

export default (state = initialState, action) => {
  if (actionHandlers[action.type]) {
    return produce(state, draft => {
      actionHandlers[action.type](draft, action)
    })
  }
  return state
}
