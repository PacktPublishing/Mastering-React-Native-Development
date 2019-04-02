import { createSelector } from 'reselect'

const getImageObjects = (state) => state.CardFeed.imageObjects
const getImageIds = (state) => state.CardFeed.imageIds
const getCardLikeToggleValue = (state) => state.CardFeed.cardLikeToggleValue

export const getVisibleImages = createSelector(
  [getImageObjects, getImageIds, getCardLikeToggleValue],
  (imageObject, imageIds, value) => {
    if (!value) return imageIds
    return imageIds.filter(id => imageObject[id].likes >= 100)
  }
)

export const getSortedVisibleImages = createSelector(
  [getImageObjects, getVisibleImages],
  (imageObject, imageIds) => {
    return imageIds.sort((id1, id2) => {
      if (imageObject[id1].likes < imageObject[id2].likes) return -1
      else if (imageObject[id1].likes > imageObject[id2].likes) return 1
      return 0
    })
  }
)

/*
import isEqual from 'lodash/isEqual'
import { createDeepEqualSelector, createSelectorCreator } from 'reselect'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)

// use the new "selector creator" to create a selector
export const getVisibleImages = createDeepEqualSelector(
  [getImageObjects, getImageIds, getCardLikeToggleValue],
  (imageObject, imageIds, value) => {
    if (!value) return imageIds
    return imageIds.filter(id => imageObject[id].likes >= 100)
  }
)
*/