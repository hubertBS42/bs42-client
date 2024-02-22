import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './features/categories/categoriesSlice'
import productsReducer from './features/products/productsSlice'
import brandsReducer from './features/brands/brandsSlice'
import cartReducer from './features/cart/cartSlice'
import currencyReducer from './features/currency/currencySlice'

export const store = configureStore({
	reducer: {
		categories: categoriesReducer,
		products: productsReducer,
		brands: brandsReducer,
		cart: cartReducer,
		currency: currencyReducer,
	},
})
