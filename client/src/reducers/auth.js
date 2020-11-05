import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';

const user = JSON.parse(localStorage.getItem('user'));
const INITIAL_STATE = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_FAIL:
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGOUT:
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}