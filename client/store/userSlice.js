import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  user: null,
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      Cookies.remove('access_token') // Remove token on logout
    },
    setUserDetails: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { loginSuccess, logout, setUserDetails } = userSlice.actions
export default userSlice.reducer
