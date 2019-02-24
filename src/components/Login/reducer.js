import * as c from './constants'

const initialState = {
  settingPassword: false,
  username: '',
  settingPasswordError: null,
  loggingIn: false,
  loginError: null,
  facebookUser: {},
}

const actionHandlers = {
  [c.SAVE_CREDENTIALS_START]: (state) => {
    return {
      ...state,
      settingPassword: true,
    }
  },
  [c.SAVE_CREDENTIALS_SUCCESS]: (state, action) => {
    return {
      ...state,
      settingPassword: false,
      username: action.username,
      settingPasswordError: null,
    }
  },
  [c.SAVE_CREDENTIALS_FAIL]: (state, action) => {
    return {
      ...state,
      settingPassword: false,
      settingPasswordError: action.error,
    }
  },
  [c.FACEBOOK_LOGIN_START]: (state) => {
    return {
      ...state,
      loggingIn: true,
    }
  },
  [c.FACEBOOK_LOGIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      loggingIn: false,
      facebookUser: action.facebookUser,
      loginError: null,
    }
  },
  [c.FACEBOOK_LOGIN_FAIL]: (state, action) => {
    return {
      ...state,
      loggingIn: false,
      loginError: action.error,
    }
  },
}

export default (state = initialState, action) => {
  if (actionHandlers[action.type]) {
    return actionHandlers[action.type](state, action)
  }
  return state
}
