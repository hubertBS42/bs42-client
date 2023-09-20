import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	brands: [],
	isLoading: false,
}

const brandsSlice = createSlice({
	name: 'brands',
	initialState,
	reducers: {
		setBrands: (state, action) => {
			state.brands = action.payload
			state.isLoading = false
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload
		},
		resetBrands: () => initialState,
	},
})

export const selectAllBrands = state => state.brands.brands
export const getBrandsLoadingState = state => state.brands.isLoading

export const { setBrands, setLoading, resetBrands } =
	brandsSlice.actions
export default brandsSlice.reducer
