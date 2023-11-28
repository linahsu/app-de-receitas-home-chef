import { combineReducers } from 'redux';
import { userLoginReducer } from './userLogin';
import { mainReducer } from './mainReducer';

const rootReducer = combineReducers({ userLoginReducer, mainReducer });

export default rootReducer;
