import {
  GET_AVATAR
} from '../actions/types'
const INITIAL_STATE = {
  avatarURL: ''
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_AVATAR:
      return { ...state, avatarURL: action.payload }
    default:
      return state
  }
}
