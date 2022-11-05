import {createStore, compose, applyMiddleware, AnyAction} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './Reducers';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionTypes} from './Types';
import {useDispatch} from 'react-redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['HomeReducer'],
};

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState, ActionTypes>(
  persistConfig,
  rootReducer,
);

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

const persistor = persistStore(store);
export {persistor, store};

export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();

export type AppDispatch = typeof store.dispatch;
