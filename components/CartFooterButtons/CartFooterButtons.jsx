'use client'
import { Button, Flex } from '@mantine/core'
import classes from './CartFooterButtons.module.scss'
import { clearCart } from '@/redux/features/cart/cartActions'
import { useSelector } from 'react-redux'
import {
	getLoadingState,
	totalCartItemSelector,
} from '@/redux/features/cart/cartSlice'
import Link from 'next/link'

const CartFooterButtons = () => {
	const loading = useSelector(getLoadingState)
	const cartItemsTotal = useSelector(totalCartItemSelector)
	return (
		<Flex py='lg' justify='flex-end' gap='md'>
			{cartItemsTotal > 0 && (
				<Button
					size='md'
					variant='outline'
					classNames={{
						root: classes.btnRoot,
					}}
					onClick={clearCart}
					loading={loading}
				>
					Clear Shopping Cart
				</Button>
			)}
			<Button
				size='md'
				variant='outline'
				classNames={{
					root: classes.btnRoot,
				}}
				component={Link}
				href='/products'
				loading={loading}
			>
				Continue Shopping
			</Button>
		</Flex>
	)
}
export default CartFooterButtons
