 
import {combineReducers} from 'redux';

import {reducer as homeReducer} from "../modules/home"
//combine all the combineReducers
const rootReducer = combineReducers({ homeReducer });

export default rootReducer;