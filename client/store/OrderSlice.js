    import { createSlice } from "@reduxjs/toolkit"

    const initialState = {
    orderDetails: [],
    }

    export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        createOrder(state, action) {
        state.orderDetails.push(action.payload)
        },
    },
    })

    export const { createOrder } = orderSlice.actions

    export default orderSlice.reducer
