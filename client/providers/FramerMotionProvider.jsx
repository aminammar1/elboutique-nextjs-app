'use client'
import {
  domAnimation,
  LazyMotion,
  MotionConfig as MotionProvider,
} from 'framer-motion'
import React from 'react'

function FramerMotionProvider({ children }) {
  return (
    <MotionProvider reducedMotion="user">
      <LazyMotion strict features={domAnimation}>
        {children}
      </LazyMotion>
    </MotionProvider>
  )
}

export default FramerMotionProvider
