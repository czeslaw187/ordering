import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducer.js';

const persistConfig = {
  key: process.env.NEXT_PUBLIC_REDUX_PERSIST,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  return createStore(persistedReducer,applyMiddleware(
    thunkMiddleware
  ));
};