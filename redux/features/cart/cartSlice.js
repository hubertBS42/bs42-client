import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
	cartItems: [],
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const product = state.cartItems.find(
				item => item.product._id === action.payload._id
			)
			if (product) {
				product.qty++
			} else {
				state.cartItems.push({
					product: action.payload,
					qty: 1,
				})
			}
		},
		removeItem: (state, action) => {
			const product = state.cartItems.find(
				item => item.product._id === action.payload._id
			)

			if (product) {
				product.qty--
				if (product.qty === 0) {
					state.cartItems = state.cartItems.filter(
						item => item.product._id !== action.payload._id
					)
				}
			}
		},
		emptyCart: () => initialState,
	},
})

const cartItems = state => state.cart.cartItems

export const selectAllCartItems = state => state.cart.cartItems

export const totalCartItemSelector = createSelector(
	[cartItems],
	cartItems =>
		cartItems.reduce((total, curr) => (total += curr.qty), 0)
)

export const totalPriceSelector = createSelector(
	[cartItems],
	cartItems =>
		cartItems.reduce(
			(total, curr) => (total += curr.qty * curr.product.sellPrice),
			0
		)
)

export const productQtySelector = createSelector(
	[cartItems, (cartItems, productId) => productId],
	(cartItems, productId) =>
		cartItems.find(item => item.product._id === productId?.qty)
)

export const { addItem, removeItem, emptyCart } = cartSlice.actions
export default cartSlice.reducer
