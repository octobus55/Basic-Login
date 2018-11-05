import firebase from '../config/config'
import { Actions } from 'react-native-router-flux'
import Expo from 'expo'
import {
  EMAIL_CHANGED,
  RESET_PASSWORD_EMAIL_CHANGED,
  PASSWORD_CHANGED,
  PASSWORD_CONFIRM_CHANGED,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGN_OUT,
  INITIATE_FACEBOOK_LOGGED_IN,
  INITIATE_GOOGLE_LOGGED_IN
} from './types'
const signInWithEmailAndPasswordSuccess = (dispatch) => () => {
  dispatch({ type: LOGIN_SUCCESS })
  Actions.welcome()
}
export const signInWithEmailAndPassword = ({ email, password }) => (dispatch) => {
  dispatch({ type: LOGIN_STARTED })
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(signInWithEmailAndPasswordSuccess(dispatch))
    .catch(() => dispatch({ type: LOGIN_FAIL }))
}

export const emailChanged = (value) => (dispatch) => {
  dispatch({
    type: EMAIL_CHANGED,
    payload: value
  })
}

export const resetPasswordEmailChanged = (value) => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD_EMAIL_CHANGED,
    payload: value
  })
}

export const passwordChanged = (value) => (dispatch) => {
  dispatch({
    type: PASSWORD_CHANGED,
    payload: value
  })
}
export const passwordConfirmChanged = (value) => (dispatch) => {
  dispatch({
    type: PASSWORD_CONFIRM_CHANGED,
    payload: value
  })
}
export const signInWithGoogleAsync = () => async (dispatch) => {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: '660205576094-tog11uurjgpb7em4vp069mvteb0l4h2l.apps.googleusercontent.com',
      iosClientId: '660205576094-nsoosp6hu3re2ktllbqd5sgnp77nivab.apps.googleusercontent.com',
      webClientId: '660205576094-ol2q5md0vs158og58s7vovno69rblc54.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    })
    if (result.type === 'success') {
      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken)
      firebase.auth().signInAndRetrieveDataWithCredential(credential).then(() => {
        Actions.welcome() //  loading loggedIn propslarını değiştir
      }).then(() => {
        dispatch({ type: GOOGLE_LOGIN_SUCCESS })
      }).then(() => {
        const { currentUser } = firebase.auth()
        const { uid, refreshToken, providerData } = currentUser
        firebase.database().ref(`UserInfo/${uid}`)
          .update({ providerData, refreshToken })
      }).catch((error) => {
        // Handle Errors here.
        console.log(error)
      })
    } else {
      return { cancelled: true }
    }
  } catch (e) {
    return { error: true }
  }
}
export const signInWithFacebookAsync = () => async (dispatch) => {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    '273542259944101',
    { permissions: ['public_profile'] }
  )
  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token)
    // Sign in with credential from the Facebook user.
    firebase.auth().signInAndRetrieveDataWithCredential(credential)
      .then(() => {
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS })
      }).then(() => {
        Actions.welcome() //  loading loggedIn propslarını değiştir
      }).then(() => {
        const { currentUser } = firebase.auth()
        const { uid, refreshToken, providerData } = currentUser
        firebase.database().ref(`UserInfo/${uid}`)
          .update({ providerData, refreshToken })
      }).catch((error) => {
        // Handle Errors here.
        console.log(error)
      })
  }
}
export const signUpUser = ({ email, password }) => (dispatch) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      firebase.auth().signInWithEmailAndPassword(email, password)
    )
    .then(signInWithEmailAndPasswordSuccess(dispatch))
}
export const sendResetPasswordEmail = ({ email }) => (dispatch) => {
  firebase.auth().sendPasswordResetEmail(email)
}
export const signOut = () => (dispatch) => {
  firebase.auth().signOut()
    .then(dispatch({ type: SIGN_OUT }))
    .then(Actions.login())
}
export const initiateStayingLoggedIn = (providerData) => (dispatch) => {
  const { photoURL, providerId, displayName, email } = providerData
  if (providerId.contains('google')) {
    dispatch({
      type: INITIATE_GOOGLE_LOGGED_IN,
      payload: photoURL,
      payload2: displayName,
      payload3: email
    })
  } else if (providerId.contains('facebook')) {
    dispatch({
      type: INITIATE_FACEBOOK_LOGGED_IN,
      payload: photoURL,
      payload2: displayName
    })
  }
}
