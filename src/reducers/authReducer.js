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
  INITIATE_GOOGLE_LOGGED_IN,
  INITIATE_FACEBOOK_LOGGED_IN
} from '../actions/types'
const INITIAL_STATE = {
  email: '',
  password: '',
  passwordConfirm: '',
  resetPasswordEmail: '',
  loading: false,
  loginType: 'email',
  loggedIn: false,
  photoURL: '',
  displayName: '',
  userEmail: ''
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload }
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload }
    case PASSWORD_CONFIRM_CHANGED:
      return { ...state, passwordConfirm: action.payload }
    case RESET_PASSWORD_EMAIL_CHANGED:
      return { ...state, resetPasswordEmail: action.payload }
    case LOGIN_STARTED:
      return { ...state, loading: true }
    case LOGIN_SUCCESS:
      return { ...state, loading: false, loggedIn: true }
    case GOOGLE_LOGIN_SUCCESS:
      return { ...state, loading: false, loggedIn: true, loginType: 'google' }
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state, loading: false, loggedIn: true, loginType: 'facebook' }
    case LOGIN_FAIL:
      return { ...state, loading: false }
    case SIGN_OUT:
      return { ...state, loggedIn: false, loading: false }
    case INITIATE_GOOGLE_LOGGED_IN:
      return { ...state, loggedIn: true, loading: true, photoURL: action.payload, loginType: 'google', displayName: action.payload2, userEmail: action.payload3 }
    case INITIATE_FACEBOOK_LOGGED_IN:
      return { ...state, loggedIn: true, loading: true, photoURL: action.payload, loginType: 'facebook', displayName: action.payload2 }
    default:
      return state
  }
}
