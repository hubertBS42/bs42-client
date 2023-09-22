import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
	settings: [],
}

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setSettings: (state, action) => {
			state.settings = action.payload
		},
	},
})

export const getSettings = state => state.settings.settings

export const { setSettings } = settingsSlice.actions
export default settingsSlice.reducer
