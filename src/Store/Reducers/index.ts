import {combineReducers} from 'redux';
import AuthReducer from './Auth/';
import HomeReducer from './Home/';

export default combineReducers({
  AuthReducer,
  HomeReducer,
});
