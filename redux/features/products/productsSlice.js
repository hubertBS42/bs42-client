import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	products: [],
	isLoading: false,
}

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload
			state.isLoading = false
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload
		},
		resetProducts: () => initialState,
	},
})

export const selectAllProducts = state => state.products.products
export const getProductsLoadingState = state =>
	state.products.isLoading

export const { setProducts, setLoading, resetProducts } =
	productsSlice.actions
export default productsSlice.reducer
