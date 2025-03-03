import axios from 'axios'
import { loginSuccess, logout } from '../store/userSlice'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth'
import {app} from '../lib/firbase'

const auth = getAuth(app)

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, data)
    return {
      success: true,
      message: response.data.message,
      data: response.data,
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Signup failed',
    }
  }
}

export const signin = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/login`,
      credentials,
      {
        withCredentials: true, // Allows sending/receiving cookies
      }
    )

    const { userId } = response.data
    dispatch(loginSuccess({ id: userId }))

    return { success: true, message: response.data.message }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed',
    }
  }
}

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/refresh`,
      {},
      {
        withCredentials: true,
      }
    )

    return response.data.accessToken
  } catch (error) {
    return null // Token refresh failed
  }
}

/**Logout  */
export const signout = () => async (dispatch) => {
  try {
    const response = await axios.post( `${API_URL}/api/auth/logout`,{},
      {
        withCredentials: true,
      }
    )

    dispatch(logout())
    
    return {
      success: true,
      message: response.data?.message || 'Logged out successfully',
    }
  } catch (error) {
    console.error('Logout error:', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Logout failed',
    }
  }
}

/** Signin With google */

export const googleAuth = () => async (dispatch) => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    console.log(user)
    
    const { data } = await axios.post(`${API_URL}/api/auth/google`, {
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
    }, { withCredentials: true })

    dispatch(loginSuccess({ id: user.uid  }))
    return { success: true, message: data.message }
  } catch (error) {
    return { success: false, message: error.message || "Google login failed" }
  }
}

/*** Sign in with Facebook  */

export const facebookAuth = () => async (dispatch) => {
  try {
    const provider = new FacebookAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    
    const { data } = await axios.post(`${API_URL}/api/auth/facebook`, {
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
    }, { withCredentials: true })

    dispatch(loginSuccess({ id: user.uid }))
    return { success: true, message: data.message }
  } catch (error) {
    return { success: false, message: error.message || "Facebook login failed" }
  }
}
