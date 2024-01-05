import { configureStore } from '@reduxjs/toolkit';
import signedReducer from './signedSlice';

const store = configureStore({
  reducer: {
    signed: signedReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
