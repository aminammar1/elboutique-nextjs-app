import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from '@/lib/storage'
import userReducer from './userSlice'
import cartReducer from './CartSlice'
import OrderReducer from './OrderSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user' , 'cart' , 'order'], 
}

// Create the root reducer with combineReducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  order: OrderReducer,
})

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

export const store = makeStore()
export const persistor = persistStore(store)