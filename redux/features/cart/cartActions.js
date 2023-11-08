import { store } from '@/redux/store'
import {
	addItem,
	emptyCart,
	setIsLoading,
	setItems,
	setUserId,
} from './cartSlice'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { fetcher } from '@/utils/functions'
import { getSession } from 'next-auth/react'

const { dispatch, getState } = store

export const addToCart = async product => {
	let token = localStorage.getItem('cart')
	token = JSON.parse(token)

	dispatch(addItem(product))

	const cart = getState().cart

	const preparedData = {
		items: cart.cartItems.map(item => {
			return { product: item.product._id, quantity: item.quantity }
		}),
	}

	const { status, message, data } = await fetcher(
		`/api/cart/update?token=${token}&userID=${cart.userId}`,
		{
			method: 'PATCH',
			body: JSON.stringify(preparedData),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}
	)

	if (status === 'success') {
		if (data?.token) {
			localStorage.setItem('cart', JSON.stringify(data.token))
		}
		notifications.show({
			title: 'Cart updated',
			message: 'Product has been added to cart successfully.',
			color: 'green',
			icon: <IconCheck />,
		})
	} else if (status === 'error' && message === 'jwt expired') {
		localStorage.removeItem('cart')
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

export const loadCart = async () => {
	let token = localStorage.getItem('cart')
	token = JSON.parse(token)

	const session = await getSession()
	const user = session?.user.id || null

	dispatch(setIsLoading(true))

	const { status, message, data } = await fetcher(
		`/api/cart?token=${token}&userID=${user}`
	)

	dispatch(setIsLoading(false))

	if (status === 'success') {
		dispatch(setUserId(user))
		if (data?.items?.length > 0) {
			dispatch(setItems(data.items))
		}
	} else if (status === 'error' && message === 'jwt expired') {
		localStorage.removeItem('cart')
		dispatch(emptyCart())
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
