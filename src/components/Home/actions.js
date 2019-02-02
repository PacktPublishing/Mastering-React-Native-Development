import * as Keychain from 'react-native-keychain'
import * as c from './constants'

const saveCredentialsStart = () => ({
  type: c.SAVE_CREDENTIALS_START
})

const saveCredentialsSuccess = (username) => ({
  type: c.SAVE_CREDENTIALS_SUCCESS,
  username,
})

const saveCredentialsFail = (error) => ({
  type: c.SAVE_CREDENTIALS_FAIL,
  error,
})

export const saveCredentials = (username, pw) => async (dispatch) => {
  dispatch(saveCredentialsStart())
  try {
    await Keychain.setGenericPassword(username, pw)
    dispatch(saveCredentialsSuccess(username))
  } catch (err) {
    console.log('ERROR SAVING CREDENTIALS: ', err)
    dispatch(saveCredentialsFail(err))
  }
}