import {combineReducers} from 'redux';
import {SAVE_USER_CREDENTIALS} from '../actions/types';

const INITIAL_STATE = {
  token: null,
  refreshToken: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_USER_CREDENTIALS:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  authReducer,
});

export default reducers;
