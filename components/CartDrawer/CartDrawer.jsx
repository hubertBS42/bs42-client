'use client'
import {
	ActionIcon,
	Button,
	Drawer,
	Indicator,
	Stack,
	Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconShoppingCart } from '@tabler/icons-react'
import CartProductCard from '../CartProductCard/CartProductCard'
import Link from 'next/link'
import { arimo, rajdhani } from '@/utils/font'
import { useSelector } from 'react-redux'
import {
	getLoadingState,
	selectAllCartItems,
	totalCartItemSelector,
} from '@/redux/features/cart/cartSlice'
import classes from './CartDrawer.module.scss'
import { clearCart } from '@/redux/features/cart/cartActions'

const CartDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false)
	const cartItemsTotal = useSelector(totalCartItemSelector)
	const cartItems = useSelector(selectAllCartItems)
	const loading = useSelector(getLoadingState)
	return (
		<>
			{cartItemsTotal > 0 ? (
				<ActionIcon
					variant='transparent'
					color='dark'
					onClick={open}
					loading={loading}
				>
					<Indicator inline label={cartItemsTotal} size={18}>
						<IconShoppingCart size='1.4em' stroke={1.2} />
					</Indicator>
				</ActionIcon>
			) : (
				<ActionIcon
					variant='transparent'
					color='dark'
					onClick={open}
					loading={loading}
				>
					<IconShoppingCart size='1.4em' stroke={1.2} />
				</ActionIcon>
			)}
			<Drawer
				opened={opened}
				onClose={close}
				position='right'
				overlayProps={{ opacity: 0.5, blur: 3 }}
				title='Shopping Cart'
			>
				{cartItems.length > 0 ? (
					cartItems.map(item => (
						<CartProductCard key={item.product._id} item={item} />
					))
				) : (
					<Text
						ff={arimo.style.fontFamily}
						fw={300}
						fz={14}
						ta='center'
						mt={100}
					>
						There are no items in your cart.
					</Text>
				)}

				<Stack justify='stretch' mt='2em'>
					{cartItems.length > 0 && (
						<>
							<Button
								size='md'
								variant='outline'
								color='gray.7'
								classNames={{
									root: classes.emptyCartBtnRoot,
								}}
								onClick={clearCart}
								loading={loading}
							>
								Clear cart
							</Button>
							<Button
								size='md'
								variant='filled'
								color='cRed.0'
								component={Link}
								href='/checkout'
								classNames={{
									root: classes.checkoutBtnRoot,
								}}
								loading={loading}
							>
								Check out now
							</Button>
						</>
					)}
				</Stack>
			</Drawer>
		</>
	)
}
export default CartDrawer
