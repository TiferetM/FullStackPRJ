import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    value: 0,
    productsList: [],
  },
  reducers: {
    setProductsList: (state, action) => {
      state.productsList = action.payload
    },
    setProduct: (state, action) => {
      state.productsList = [...state.productsList, action.payload]
    }
  }
})

// Action creators are generated for each case reducer function
export const { productsList, setProductsList, setProduct } = productsSlice.actions

export default productsSlice.reducer