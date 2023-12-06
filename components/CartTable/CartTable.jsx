'use client'
import {
	ActionIcon,
	Box,
	Flex,
	NumberInput,
	Stack,
	Table,
	Text,
	Title,
} from '@mantine/core'
import classes from './CartTable.module.scss'
import { useSelector } from 'react-redux'
import {
	selectAllCartItems,
	totalCartItemSelector,
	totalPriceSelector,
} from '@/redux/features/cart/cartSlice'
import { getSettings } from '@/redux/features/settings/settingsSlice'
import { roundMoney } from '@/utils/functions'
import {
	modifyCart,
	removeFromCart,
} from '@/redux/features/cart/cartActions'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import Image from 'next/image'
import Link from 'next/link'
import { IconTrash } from '@tabler/icons-react'

const CartTable = () => {
	const [loading, setLoading] = useState(false)
	const cartItemsTotal = useSelector(totalCartItemSelector)
	const cartPriceTotal = useSelector(totalPriceSelector)
	const settings = useSelector(getSettings)
	const cartItems = useSelector(selectAllCartItems)
	// const loading = useSelector(getLoadingState)

	const currentRate = settings[0]?.exchangeRate.currentRate
	const roundedPriceTotal = roundMoney(cartPriceTotal * currentRate)

	const handleChange = useDebouncedCallback(
		async (product, quantity) => {
			setLoading(true)
			await modifyCart(product, quantity)
			setLoading(false)
		},
		800
	)

	const handleRemove = async product => {
		setLoading(true)
		await removeFromCart(product)
		setLoading(false)
	}

	const rows = cartItems.map(item => (
		<Table.Tr key={item._id}>
			<Table.Td>
				<Flex align='center' gap='md'>
					<Box
						pos='relative'
						h={80}
						w={80}
						style={{ objectFit: 'contain' }}
					>
						<Image
							src={item.product.images[0].url}
							alt={item.product.title}
							fill
						/>
					</Box>
					<Stack gap={2} justify='center'>
						<Title order={4} className={classes.brand}>
							{item.product.brand.name}
						</Title>

						<Link href={`/product/${item.product.slug}`}>
							<Title order={3} className={classes.title}>
								{item.product.title}
							</Title>
						</Link>
					</Stack>
				</Flex>
			</Table.Td>
			<Table.Td>
				<Text className={classes.price}>
					{`GHS ${roundMoney(item.product.sellPrice * currentRate)}`}
				</Text>
			</Table.Td>
			<Table.Td>
				<NumberInput
					classNames={{
						label: classes.numberInputLabel,
						input: classes.numberInputInput,
						root: classes.numberInputRoot,
					}}
					allowNegative={false}
					clampBehavior='strict'
					allowDecimal={false}
					size='sm'
					defaultValue={item.quantity}
					onChange={quantity => handleChange(item.product, quantity)}
					disabled={loading}
					min={0}
					max={item.product.countInStock}
				/>
			</Table.Td>
			<Table.Td>
				<Text className={classes.price}>
					{`GHS ${roundMoney(
						item.product.sellPrice * item.quantity * currentRate
					)}`}
				</Text>
			</Table.Td>
			<Table.Td>
				<ActionIcon
					variant='outline'
					color='red'
					aria-label='Delete'
					ml='auto'
					onClick={() => handleRemove(item.product)}
					disabled={loading}
				>
					<IconTrash
						style={{ width: '70%', height: '70%' }}
						stroke={1.5}
					/>
				</ActionIcon>
			</Table.Td>
		</Table.Tr>
	))

	return (
		<Box visibleFrom='sm'>
			<Title tt='uppercase' order={3} mb='md'>
				Your Cart ({`${cartItemsTotal} Items`})
			</Title>
			{cartItemsTotal > 0 ? (
				<Table
					classNames={{
						thead: classes.thead,
						table: classes.table,
					}}
				>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Item</Table.Th>
							<Table.Th>Price</Table.Th>
							<Table.Th>Quantity</Table.Th>
							<Table.Th>Total</Table.Th>
							<Table.Th></Table.Th>
						</Table.Tr>
					</Table.Thead>
					{/* <Table.Tbody>{empty}</Table.Tbody> */}
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			) : (
				<Text fw={300} c='gray.8'>
					You have no items in your cart.
				</Text>
			)}
		</Box>
	)
}
export default CartTable
