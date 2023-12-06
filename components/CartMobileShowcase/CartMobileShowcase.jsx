'use client'
import { Box, Title } from '@mantine/core'
import classes from './CartMobileShowcase.module.scss'
import { useSelector } from 'react-redux'
import {
	selectAllCartItems,
	totalCartItemSelector,
} from '@/redux/features/cart/cartSlice'
import CartProductCard from '../CartProductCard/CartProductCard'

const CartMobileShowcase = () => {
	const cartItemsTotal = useSelector(totalCartItemSelector)
	const cartItems = useSelector(selectAllCartItems)

	return (
		<Box hiddenFrom='sm'>
			<Title tt='uppercase' order={4} mb='md'>
				Your Cart ({`${cartItemsTotal} Items`})
			</Title>

			{cartItemsTotal > 0 &&
				cartItems.map(item => (
					<CartProductCard item={item} key={item._id} />
				))}
		</Box>
	)
}
export default CartMobileShowcase
