import commonReducer from './slices/commonSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    common: commonReducer
});

export default rootReducer;