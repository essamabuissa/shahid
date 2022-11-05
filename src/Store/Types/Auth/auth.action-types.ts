import {SET_USER} from '../../Actions/ActionTypes';

interface SetUser {
  type: typeof SET_USER;
  payload: string | null;
}

export type AuthActionTypes = SetUser;
