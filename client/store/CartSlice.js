    import { createSlice } from '@reduxjs/toolkit'

    const initialState = {
    cartItems: [],
    }

    export const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addToCart(state, action) {
        state.cartItems.push(action.payload)
        },
        updateToCart(state, action) {
        state.cartItems = action.payload
        },
        emptyToCart(state) {
        state.cartItems = []
        },
    },
    })

    export const { addToCart, emptyToCart, updateToCart } = cartSlice.actions

    export default cartSlice.reducer
