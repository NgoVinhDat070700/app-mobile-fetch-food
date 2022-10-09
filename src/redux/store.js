import AsyncStorage from '@react-native-community/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import apiSlice from './api/apiSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  app: apiSlice,
});

const presisteReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: presisteReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
export default store;

export const persistor = persistStore(store);

persistor.purge();
