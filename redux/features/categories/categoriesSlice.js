import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categories: [],
	isLoading: false,
}

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload
			state.isLoading = false
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload
		},
		resetCategories: () => initialState,
	},
})

export const selectAllCategories = state =>
	state.categories.categories
export const getCategoriesLoadingState = state =>
	state.categories.isLoading

export const { setCategories, setLoading, resetCategories } =
	categoriesSlice.actions
export default categoriesSlice.reducer
