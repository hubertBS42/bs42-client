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
	selectAllCartItems,
	totalCartItemSelector,
} from '@/redux/features/cart/cartSlice'

const CartDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false)
	const cartItemsTotal = useSelector(totalCartItemSelector)
	const cartItems = useSelector(selectAllCartItems)
	return (
		<>
			{cartItemsTotal > 0 ? (
				<ActionIcon variant='transparent' color='dark' onClick={open}>
					<Indicator inline label={cartItemsTotal} size={18}>
						<IconShoppingCart size='1.4em' stroke={1.2} />
					</Indicator>
				</ActionIcon>
			) : (
				<ActionIcon variant='transparent' color='dark' onClick={open}>
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
					<Text ff={arimo.style.fontFamily} fw={300} fz={14} ta='center'>
						There are no items in your cart.
					</Text>
				)}

				<Stack justify='stretch' mt='2em'>
					{cartItems.length > 0 && (
						<Button
							size='md'
							variant='filled'
							color='cRed.0'
							tt='uppercase'
							ff={rajdhani.style.fontFamily}
							style={theme => ({
								fontWeight: 700,
								transition: 'ease-in .3s all',

								'&:hover': {
									backgroundColor: 'white',
									color: theme.colors.cRed[0],
									border: `1px solid ${theme.colors.cRed[0]}`,
								},
							})}
							component={Link}
							href='/checkout'
						>
							Check out now
						</Button>
					)}

					<Button
						size='md'
						variant='outline'
						color='gray.5'
						tt='uppercase'
						ff={rajdhani.style.fontFamily}
						style={theme => ({
							boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
							fontWeight: 700,
							transition: 'ease-in .3s all',
							color: theme.colors.gray[7],

							'&:hover': {
								backgroundColor: theme.colors.gray[7],
								color: 'red',
							},
						})}
						component={Link}
						href='/cart'
					>
						View cart
					</Button>
				</Stack>
			</Drawer>
		</>
	)
}
export default CartDrawer
