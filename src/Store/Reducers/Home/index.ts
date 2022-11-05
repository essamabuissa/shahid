import {GIPHY} from '../../../Types';
import {
  ADD_TO_FAVORITES,
  CLEAR_FAVORITES,
  INCREASE_OFFSET,
  REMOVE_FROM_FAVORITES,
  RESET_OFFSET,
  SET_ACTIVE_ITEM,
  SET_ITEMS,
  SET_LOADING,
} from '../../Actions/ActionTypes';
import {ActionTypes} from '../../Types';

export interface HomeReducer {
  items: GIPHY[] | [];
  activeItem: GIPHY | null;
  favorites: GIPHY[] | [];
  offset: number;
  isLoading: boolean;
}

const initialState = {
  items: [],
  activeItem: null,
  favorites: [],
  offset: 0,
  isLoading: false,
};

export default (state = initialState, action: ActionTypes): HomeReducer => {
  switch (action.type) {
    case SET_ITEMS:
      if (state.offset === 0) {
        return {
          ...state,
          items: action.payload,
        };
      } else {
        return {
          ...state,
          items: [...state.items, ...action.payload],
        };
      }
    case SET_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload,
      };
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case REMOVE_FROM_FAVORITES:
      const filteredFavorites = state.favorites.filter((item: GIPHY) => {
        return item.id !== action.payload;
      });
      return {
        ...state,
        favorites: filteredFavorites,
      };
    case CLEAR_FAVORITES:
      return {
        ...state,
        favorites: [],
      };

    case INCREASE_OFFSET:
      return {
        ...state,
        offset: state.offset + 1,
      };
    case RESET_OFFSET:
      return {
        ...state,
        offset: 0,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
