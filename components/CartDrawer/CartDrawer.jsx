'use client'
import {
	ActionIcon,
	Button,
	Drawer,
	Flex,
	Indicator,
	Stack,
	Text,
	Title,
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
	totalPriceSelector,
} from '@/redux/features/cart/cartSlice'
import classes from './CartDrawer.module.scss'
import { clearCart } from '@/redux/features/cart/cartActions'
import { getSettings } from '@/redux/features/settings/settingsSlice'
import { roundMoney } from '@/utils/functions'

const CartDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false)
	const cartItemsTotal = useSelector(totalCartItemSelector)
	const cartPriceTotal = useSelector(totalPriceSelector)
	const settings = useSelector(getSettings)
	const cartItems = useSelector(selectAllCartItems)
	const loading = useSelector(getLoadingState)

	const currentRate = settings[0]?.exchangeRate.currentRate
	const roundedPriceTotal = roundMoney(cartPriceTotal * currentRate)
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

				{cartItems.length > 0 && (
					<Stack mt='1em' gap={0} align='flex-end'>
						<Title
							order={6}
							classNames={{
								root: classes.totalTitle,
							}}
						>
							Total:
						</Title>
						<Title order={3} className={classes.totalValue}>
							GHS {roundedPriceTotal}
						</Title>
					</Stack>
				)}

				<Stack justify='stretch' mt='1em'>
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
								disabled={loading}
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
