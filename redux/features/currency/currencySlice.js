import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currency: null,
}

const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setCurrency: (state, action) => {
			state.currency = action.payload
		},
	},
})

export const getCurrency = state => state.currency.currency

export const { setCurrency } = currencySlice.actions
export default currencySlice.reducer
