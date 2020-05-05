import {SAVE_USER_CREDENTIALS} from './types';

export const saveToken = (tokens) => ({
  type: SAVE_USER_CREDENTIALS,
  payload: tokens,
});
