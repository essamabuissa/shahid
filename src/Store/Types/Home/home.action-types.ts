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

interface SetImages {
  type: typeof SET_ITEMS;
  payload: GIPHY[] | [];
}

interface SetActiveItem {
  type: typeof SET_ACTIVE_ITEM;
  payload: GIPHY | null;
}

interface AddToFavorites {
  type: typeof ADD_TO_FAVORITES;
  payload: GIPHY;
}

interface RemoveFromFavorites {
  type: typeof REMOVE_FROM_FAVORITES;
  payload: string;
}

interface ClearFavorites {
  type: typeof CLEAR_FAVORITES;
}

interface IncreaseOffset {
  type: typeof INCREASE_OFFSET;
}

interface ResetOffset {
  type: typeof RESET_OFFSET;
}

interface SetLoading {
  type: typeof SET_LOADING;
  payload: boolean;
}

export type HomeActionTypes =
  | SetImages
  | SetActiveItem
  | AddToFavorites
  | RemoveFromFavorites
  | IncreaseOffset
  | SetLoading
  | ResetOffset
  | ClearFavorites;
