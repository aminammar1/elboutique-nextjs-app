'use client'

import React from 'react'
import FramerMotionProvider from './FramerMotionProvider'
import ToastProvider from './ToasterProvider'
import { Provider } from 'react-redux'
import { store, persistor } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FramerMotionProvider>
          <ToastProvider />
          {children}
        </FramerMotionProvider>
      </PersistGate>
    </Provider>
  )
}
