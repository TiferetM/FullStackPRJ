import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './silces/productsSlice';

export default configureStore({
  reducer: {
    products: productsReducer
  }
})
