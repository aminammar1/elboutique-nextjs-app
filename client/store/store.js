import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@/lib/storage'
import userReducer from './UserSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // only user will be persisted
}

const UserReducer  = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)
