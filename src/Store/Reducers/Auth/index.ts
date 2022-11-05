import {SET_USER} from '../../Actions/ActionTypes';
import {ActionTypes} from '../../Types';

export interface AuthReducer {
  user: string | null;
}

const initialState = {
  user: null,
};

export default (state = initialState, action: ActionTypes): AuthReducer => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
