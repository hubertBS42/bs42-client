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
				Your Cart (
				{`${cartItemsTotal} Item${
					cartItemsTotal === 0 || (cartItemsTotal > 1 && 's')
				}`}
				)
			</Title>

			{cartItemsTotal > 0 &&
				cartItems.map((item, i) => (
					<CartProductCard item={item} key={i} />
				))}
		</Box>
	)
}
export default CartMobileShowcase
