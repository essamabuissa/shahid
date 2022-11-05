import {AppDispatch} from '../..';
import {SET_USER} from '../ActionTypes';

export const LoginAction = (email: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_USER,
    payload: email,
  });
};
