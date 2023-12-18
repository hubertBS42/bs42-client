'use client'

import {
	ActionIcon,
	Button,
	Card,
	Flex,
	TextInput,
	Title,
} from '@mantine/core'
import classes from './ConfirmOrderCard.module.scss'
import { useSelector } from 'react-redux'
import {
	getLoadingState,
	totalCartItemSelector,
	totalPriceSelector,
} from '@/redux/features/cart/cartSlice'
import { getSettings } from '@/redux/features/settings/settingsSlice'
import { roundMoney } from '@/utils/functions'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

const ConfirmOrderCard = () => {
	const cartItemsTotal = useSelector(totalCartItemSelector)
	const cartPriceTotal = useSelector(totalPriceSelector)
	const settings = useSelector(getSettings)
	const loading = useSelector(getLoadingState)

	const currentRate = settings[0]?.exchangeRate.currentRate
	const roundedPriceTotal = roundMoney(cartPriceTotal * currentRate)
	return (
		<Card radius='sm' className={classes.container} withBorder p='xl'>
			<Title order={4} c='gray.7' tt='uppercase' mb='md'>
				Order Summary:
			</Title>

			<TextInput
				size='md'
				mb='md'
				placeholder='Coupon Code'
				description='Enter coupon codes to apply discounts'
				rightSectionWidth={42}
				rightSection={
					<ActionIcon size={32} variant='filled'>
						<IconArrowRight style={{ width: 18, height: 18 }} stroke={2} />
					</ActionIcon>
				}
			/>

			<Flex justify='space-between'>
				<Title order={6} c='gray.7'>
					Subtotal:
				</Title>
				<Title order={5} c='gray.7' fw={500}>
					GHS {roundedPriceTotal}
				</Title>
			</Flex>

			<Flex justify='space-between' mb='xs'>
				<Title order={6} c='gray.7'>
					Delivery:
				</Title>
				<Title order={5} c='gray.7' fw={500}>
					GHS 0.00
				</Title>
			</Flex>

			<Flex justify='space-between'>
				<Title order={4} c='gray.8'>
					Grand total:
				</Title>
				<Title order={4} c='gray.8'>
					GHS {roundedPriceTotal}
				</Title>
			</Flex>

			<Button
				size='md'
				mt='md'
				variant='filled'
				fullWidth
				classNames={{
					root: classes.checkoutBtnRoot,
				}}
				disabled={loading}
			>
				Confirm Order
			</Button>
		</Card>
	)
}
export default ConfirmOrderCard
