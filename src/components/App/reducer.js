import * as login from '../Login'

const initialState = {
  facebookUser: {},
}

const actionHandlers = {
  [login.constants.FACEBOOK_LOGIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      facebookUser: action.facebookUser,
    }
  },
}

export default (state = initialState, action) => {
  if (actionHandlers[action.type]) {
    return actionHandlers[action.type](state, action)
  }
  return state
}
