import { arimo, rajdhani } from '@/utils/font'
import {
	ActionIcon,
	Box,
	Flex,
	NumberInput,
	Stack,
	Text,
	Title,
} from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import classes from './CartProductCard.module.scss'
import { useSelector } from 'react-redux'
import { getSettings } from '@/redux/features/settings/settingsSlice'
import { roundMoney } from '@/utils/functions'
import { IconTrash } from '@tabler/icons-react'
import {
	modifyCart,
	removeFromCart,
} from '@/redux/features/cart/cartActions'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const CartProductCard = ({ item }) => {
	const [loading, setLoading] = useState(false)
	const settings = useSelector(getSettings)
	const currentRate = settings[0]?.exchangeRate.currentRate
	const roundedSellPrice = roundMoney(
		item.product.sellPrice * currentRate
	)

	const handleChange = useDebouncedCallback(async quantity => {
		setLoading(true)
		await modifyCart(item.product, quantity)
		setLoading(false)
	}, 800)

	const handleRemove = async () => {
		setLoading(true)
		await removeFromCart(item.product)
		setLoading(false)
	}

	return (
		<Flex
			direction='row'
			gap='sm'
			align='center'
			py='.3em'
			className={classes.wrapper}
		>
			<Box className={classes.imgWrapper}>
				<Image
					src={item.product.images[0].url}
					alt={item.product.title}
					fill
					style={{ objectFit: 'contain' }}
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
				<Flex align='center' gap='xs' mt={5}>
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
						onChange={handleChange}
						disabled={loading}
						min={0}
						max={item.product.countInStock}
					/>
					<Text className={classes.price}> @ GHS {roundedSellPrice}</Text>
				</Flex>
			</Stack>

			<ActionIcon
				variant='outline'
				color='red'
				aria-label='Delete'
				ml='auto'
				onClick={handleRemove}
				disabled={loading}
			>
				<IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
			</ActionIcon>
		</Flex>
	)
}
export default CartProductCard
