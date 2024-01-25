import { store } from '@/redux/store'
import {
	addItem,
	emptyCart,
	modifyItem,
	removeItem,
	setIsLoading,
	setItems,
	setUserId,
} from './cartSlice'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { fetcher } from '@/utils/functions'
import { getSession } from 'next-auth/react'

const { dispatch, getState } = store

export const modifyCart = async (product, quantity) => {
	const session = await getSession()
	let cartToken = localStorage.getItem('cartToken') || null
	const userID = session?.user.id || null

	if (cartToken) {
		cartToken = JSON.parse(cartToken)
	}

	dispatch(modifyItem({ product, quantity }))

	const currentCart = getState().cart

	const preparedData = {
		items: currentCart.cartItems.map(item => {
			return { product: item.product._id, quantity: item.quantity }
		}),
	}

	const { status, message, data } = await fetcher(
		`/api/cart/update?cartToken=${cartToken}&userID=${userID}`,
		{
			method: 'PATCH',
			body: JSON.stringify(preparedData),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}
	)

	if (status === 'success') {
		if (data.token) {
			localStorage.setItem('cartToken', JSON.stringify(data.token))
		}

		notifications.show({
			title: 'Cart updated',
			message: 'Product has been added to cart successfully.',
			color: 'green',
			icon: <IconCheck />,
		})
	} else if (status === 'error' && message === 'jwt expired') {
		localStorage.removeItem('cartToken')
		dispatch(emptyCart())
	} else {
		notifications.show({
			title: 'Error',
			message: 'Failed to update cart.',
			color: 'red',
			icon: <IconX />,
		})
	}
}

export const addToCart = async product => {
	const session = await getSession()
	let cartToken = localStorage.getItem('cartToken') || null
	const userID = session?.user.id || null

	if (cartToken) {
		cartToken = JSON.parse(cartToken)
	}

	dispatch(addItem(product))

	const currentCart = getState().cart

	const preparedData = {
		items: currentCart.cartItems.map(item => {
			return { product: item.product._id, quantity: item.quantity }
		}),
	}

	const { status, message, data } = await fetcher(
		`/api/cart/update?cartToken=${cartToken}&userID=${userID}`,
		{
			method: 'PATCH',
			body: JSON.stringify(preparedData),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}
	)

	if (status === 'success') {
		if (data.token) {
			localStorage.setItem('cartToken', JSON.stringify(data.token))
		}

		notifications.show({
			title: 'Cart updated',
			message: 'Product has been added to cart successfully.',
			color: 'green',
			icon: <IconCheck />,
		})
	} else if (status === 'error' && message === 'jwt expired') {
		localStorage.removeItem('cartToken')
		dispatch(emptyCart())
		addToCart(product)
	} else {
		notifications.show({
			title: 'Error',
			message: 'Failed to update cart.',
			color: 'red',
			icon: <IconX />,
		})
	}
}

export const removeFromCart = async product => {
	const session = await getSession()
	let cartToken = localStorage.getItem('cartToken') || null
	const userID = session?.user.id || null

	if (cartToken) {
		cartToken = JSON.parse(cartToken)
	}

	dispatch(removeItem(product))

	const currentCart = getState().cart

	const preparedData = {
		items: currentCart.cartItems.map(item => {
			return { product: item.product._id, quantity: item.quantity }
		}),
	}

	const { status, message, data } = await fetcher(
		`/api/cart/update?cartToken=${cartToken}&userID=${userID}`,
		{
			method: 'PATCH',
			body: JSON.stringify(preparedData),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}
	)

	if (status === 'success') {
		if (data.token) {
			localStorage.setItem('cartToken', JSON.stringify(data.token))
		}

		notifications.show({
			title: 'Cart updated',
			message: 'Product has been removed from cart successfully.',
			color: 'green',
			icon: <IconCheck />,
		})
	} else if (status === 'error' && message === 'jwt expired') {
		localStorage.removeItem('cartToken')
		dispatch(emptyCart())
	} else {
		notifications.show({
			title: 'Error',
			message: 'Failed to update cart.',
			color: 'red',
			icon: <IconX />,
		})
	}
}

export const loadCart = async (pathname, router) => {
	let cartToken = localStorage.getItem('cartToken') || null

	if (cartToken) {
		cartToken = JSON.parse(cartToken)
	}

	const session = await getSession()
	const userID = session?.user.id || null

	if (!userID && !cartToken) {
		// router.push('/products')
		return
	}

	dispatch(setIsLoading(true))

	const { status, message, data } = await fetcher(
		`/api/cart?cartToken=${cartToken}&userID=${userID}`
	)

	dispatch(setIsLoading(false))

	if (status === 'success') {
		if (!data) return

		if (!data.token) {
			localStorage.removeItem('cartToken')
		}

		if (data?.items?.length > 0) {
			dispatch(setItems(data.items))
		} else if (data?.items?.length === 0 && pathname === '/checkout') {
			router.push('/products')
		}
	} else if (status === 'error' && message === 'jwt expired') {
		localStorage.removeItem('cartToken')
		dispatch(emptyCart())
	} else {
		notifications.show({
			title: 'Error',
			message: 'Failed to load cart.',
			color: 'red',
			icon: <IconX />,
		})
	}
}

export const clearCart = async () => {
	const session = await getSession()
	let cartToken = localStorage.getItem('cartToken') || null
	const userID = session?.user.id || null

	if (cartToken) {
		cartToken = JSON.parse(cartToken)
	}

	const preparedData = {
		items: [],
	}

	dispatch(setIsLoading(true))

	const { status, message, data } = await fetcher(
		`/api/cart/update?cartToken=${cartToken}&userID=${userID}`,
		{
			method: 'PATCH',
			body: JSON.stringify(preparedData),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}
	)

	dispatch(setIsLoading(true))

	if (status === 'success') {
		dispatch(emptyCart())
		notifications.show({
			title: 'Cart Emptied',
			message: 'You have successfully emptied out your cart.',
			color: 'green',
			icon: <IconCheck />,
		})
	} else if (status === 'error' && message === 'jwt expired') {
		localStorage.removeItem('cartToken')
		dispatch(emptyCart())
	} else {
		notifications.show({
			title: 'Error',
			message: 'An error occured while emptying out cart.',
			color: 'red',
			icon: <IconX />,
		})
	}
}

// export const updateCart = async data => {
// 	const { cartItems, newItem, user, quantity, action } = data
// 	let token = localStorage.getItem('cart')
// 	token = JSON.parse(token)
// 	let preparedData

// 	preparedData = {
// 		user,
// 		product: product._id,
// 		quantity,
// 	}

// 	const { status, message, data } = await fetcher(
// 		`/api/cart/update?token=${token}`,
// 		{
// 			method: 'PATCH',
// 			body: JSON.stringify(preparedData),
// 			headers: {
// 				'Content-type': 'application/json; charset=UTF-8',
// 			},
// 		}
// 	)

// 	if (status === 'success') {
// 		if (!token) {
// 			localStorage.setItem('cart', JSON.stringify(data.token))
// 		}
// 		notifications.show({
// 			title: 'Cart updated',
// 			message: 'Product has been added to cart successfully.',
// 			color: 'green',
// 			icon: <IconCheck />,
// 		})
// 	} else {
// 		notifications.show({
// 			title: 'Error',
// 			message: 'Failed to update cart.',
// 			color: 'red',
// 			icon: <IconX />,
// 		})
// 	}
// }
