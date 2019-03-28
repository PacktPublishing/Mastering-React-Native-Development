import * as Keychain from 'react-native-keychain'
import { AccessToken, LoginManager } from 'react-native-fbsdk'

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
  if (username.length <= 0 || pw.length <= 0) {
    dispatch(saveCredentialsFail('Please Insert Username and Password'))
    return
  }
  try {
    await Keychain.setGenericPassword(username, pw)
    dispatch(saveCredentialsSuccess(username))
  } catch (err) {
    console.log('ERROR SAVING CREDENTIALS: ', err)
    dispatch(saveCredentialsFail('Error Saving Credentials in Keychain'))
  }
}

const loginWithFacebookStart = () => ({
  type: c.FACEBOOK_LOGIN_START
})

const loginWithFacebookSuccess = (facebookUser) => ({
  type: c.FACEBOOK_LOGIN_SUCCESS,
  facebookUser,
})

const loginWithFacebookStartFail = (error) => ({
  type: c.FACEBOOK_LOGIN_FAIL,
  error,
})

export const loginWithFacebook = () => async (dispatch) => {
  dispatch(loginWithFacebookStart())
  try {
    const loginResult = await LoginManager.logInWithReadPermissions(["public_profile"])
    if (loginResult.isCancelled) {
      dispatch(loginWithFacebookFail('Login Cancelled'))
    } else {
      console.log(
        "Login success with permissions: " +
        loginResult.grantedPermissions.toString()
      )
      // Use the Facebook SDK to retrieve the user's access token
      const fbAccessTokenData = await AccessToken.getCurrentAccessToken()
      
      // Using the access token, retreive the user's name and picture
      const facebookResponse = await fetch(
        `https://graph.facebook.com/v2.5/me?fields=name,picture.type(large)&access_token=${fbAccessTokenData.accessToken.toString()}`,
        { headers: { 'Content-Type': 'application/json' } }
      )

      // Parse the JSON response from Facebook
      const facebookUser = JSON.parse(facebookResponse._bodyText)

      // Repurpose the saveCredentials function to store access token
      await dispatch(saveCredentials(facebookUser.id, fbAccessTokenData.accessToken.toString()))
      dispatch(loginWithFacebookSuccess(facebookUser))
    }
  } catch (error) {
    console.log("Login fail with error: " + error)
    dispatch(loginWithFacebookStartFail(error))
  }
}
