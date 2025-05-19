import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

// Create a Redux store with imported reducers for each slice
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});