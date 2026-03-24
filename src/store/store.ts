import { configureStore } from "@reduxjs/toolkit"
import messageReducer from '../slices/messageSlice'
import cartReducer from '../slices/cartSlice'

export const store = configureStore({
  reducer: {
    message: messageReducer,
    cart: cartReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch