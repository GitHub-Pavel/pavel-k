import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';


const store = configureStore({
  reducer: rootReducer
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export default store;