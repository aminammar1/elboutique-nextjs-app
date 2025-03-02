import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@/lib/storage'
import userReducer from './userSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // only user will be persisted
}

const UserReducer = persistReducer(persistConfig, userReducer)

// Prevent store from initializing on the server
const makeStore = () =>
  configureStore({
    reducer: { user: UserReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  })

export const store = makeStore()
export const persistor = persistStore(store)
