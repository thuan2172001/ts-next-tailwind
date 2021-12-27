import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authReducer';
const reducers = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default function configure() {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
}
