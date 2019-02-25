import * as Keychain from 'react-native-keychain'
import { NavigationActions, StackActions } from 'react-navigation'

export const isSignedIn = async () => {
  try {
    const credentials = await Keychain.getGenericPassword()
    if (credentials) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return false
  }
}

export const logoutUser = async (navigation) => {
  try {
    await Keychain.resetGenericPassword()
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'SignedOut' })
      ]
    });
    navigation.dispatch(resetAction)
    return true
  } catch (err) {
    return false
  }
}