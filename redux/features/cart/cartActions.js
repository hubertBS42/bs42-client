import { store } from '@/redux/store'
import { addItem } from './cartSlice'
import { notifications } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'

const { dispatch } = store

export const addToCart = async product => {
	dispatch(addItem(product))
	notifications.show({
		title: 'Cart updated',
		message: 'Product has been added to cart',
		color: 'green',
		icon: <IconCheck />,
	})
}
