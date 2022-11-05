import {Alert} from 'react-native';
import {Dispatch} from 'redux';
import {AppDispatch, store} from '../..';
import {GIPHY} from '../../../Types';
import {
  ADD_TO_FAVORITES,
  CLEAR_FAVORITES,
  INCREASE_OFFSET,
  REMOVE_FROM_FAVORITES,
  RESET_OFFSET,
  SET_ACTIVE_ITEM as SET_ACTIVE_ITEM,
  SET_ITEMS,
  SET_LOADING,
} from '../ActionTypes';

const API_URL = 'https://api.giphy.com/v1/gifs';
const API_KEY = 'kenMorPrLG85atLKS43nTHs2GoUxlePf';

export const ClearActiveItemAction = () => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_ACTIVE_ITEM,
    payload: null,
  });
};
export const SetLoadingAction = (value: boolean) => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: value,
  });
};
export const AddToFavoritesAction = (item: GIPHY) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: item,
  });
};

export const RemoveFromFavoritesAction =
  (itemId: string) => (dispatch: AppDispatch) => {
    dispatch({
      type: REMOVE_FROM_FAVORITES,
      payload: itemId,
    });
  };

export const ClearFavoritesAction = () => (dispatch: any) => {
  dispatch({
    type: CLEAR_FAVORITES,
  });
};

export const IncreaseOffsetAction = () => (dispatch: any) => {
  dispatch({
    type: INCREASE_OFFSET,
  });
};

export const ResetOffsetAction = () => (dispatch: any) => {
  dispatch({
    type: RESET_OFFSET,
  });
};
export const GetItemsAction = () => async (dispatch: any) => {
  const {offset} = store.getState().HomeReducer;
  fetch(
    `${API_URL}/trending?api_key=${API_KEY}&tag=&rating=g&limit=20&offset=${offset}`,
  )
    .then(response => {
      dispatch(SetLoadingAction(true));
      return response.json();
    })
    .then(responseJson => {
      responseJson = responseJson?.data;

      dispatch({
        type: SET_ITEMS,
        payload: responseJson,
      });
    })
    .catch(error => {
      dispatch(SetLoadingAction(false));
      console.error(error);
    })
    .finally(() => {
      dispatch(SetLoadingAction(false));
    });
};

export const GetItemByIDAction =
  (gifId: string, navigate: any) => async (dispatch: AppDispatch) => {
    fetch(`${API_URL}/${gifId}?api_key=kenMorPrLG85atLKS43nTHs2GoUxlePf`)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: SET_ACTIVE_ITEM,
          payload: data.data,
        });
        if (data.meta.status === 200) {
          navigate('ItemDetails');
        } else {
          Alert.alert(data.meta.msg);
        }
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

export const SearchItemsAction =
  (query: string, setSearchItems: (value: []) => void) =>
  async (dispatch: any) => {
    const {offset} = store.getState().HomeReducer;
    fetch(
      `${API_URL}/search?api_key=${API_KEY}&q=${query}&limit=20&offset=${offset}&rating=g&lang=en`,
    )
      .then(response => {
        dispatch(SetLoadingAction(true));
        return response.json();
      })
      .then(responseJson => {
        responseJson = responseJson?.data;
        setSearchItems(responseJson);
      })
      .catch(error => {
        dispatch(SetLoadingAction(false));
        console.error(error);
      })
      .finally(() => {
        dispatch(SetLoadingAction(false));
      });
  };
