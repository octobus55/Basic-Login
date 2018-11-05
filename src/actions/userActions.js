import firebase from '../config/config'
import {
  GET_AVATAR
} from './types'
export const getImage = (loginType) => (dispatch) => {
  const { currentUser } = firebase.auth()
  if (loginType === 'facebook' || loginType === 'google') {
    firebase.database().ref(`UserInfo/${currentUser.uid}/providerData`)
      .once('value', snapshot => {
        dispatch({
          type: GET_AVATAR,
          payload: snapshot.val()[0].photoURL
        })
      })
  }
}
