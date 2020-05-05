import {combineReducers} from 'redux';

const INITIAL_STATE = {
  token: null,
  refreshToken: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const reducers = combineReducers({
  authReducer,
});

export default reducers;
