'use client'
import { Button, Card, Flex, Title } from '@mantine/core'
import classes from './CartFooterCards.module.scss'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import {
	getLoadingState,
	totalCartItemSelector,
	totalPriceSelector,
} from '@/redux/features/cart/cartSlice'
import { roundMoney } from '@/utils/functions'

const CartFooterCards = ({ rate }) => {
	const cartItemsTotal = useSelector(totalCartItemSelector)
	const cartPriceTotal = useSelector(totalPriceSelector)

	const loading = useSelector(getLoadingState)

	const roundedPriceTotal = roundMoney(cartPriceTotal * rate)

	if (cartItemsTotal > 0) {
		return (
			<Flex justify='flex-end'>
				<Card radius='sm' className={classes.container}>
					<Card.Section withBorder py='xs' px={0}>
						<Title order={4} c='gray.7' tt='uppercase'>
							Order Summary:
						</Title>
					</Card.Section>

					<Card.Section withBorder py='xs' px={0}>
						<Flex justify='space-between'>
							<Title order={6} c='gray.7'>
								Subtotal:
							</Title>
							<Title order={5} c='gray.7'>
								GHS {roundedPriceTotal}
							</Title>
						</Flex>
					</Card.Section>

					<Card.Section py='xs' px={0}>
						<Flex justify='space-between'>
							<Title order={4} c='gray.8'>
								Grand total:
							</Title>
							<Title order={4} c='gray.8'>
								GHS {roundedPriceTotal}
							</Title>
						</Flex>
					</Card.Section>

					<Card.Section py='xs' px={0}>
						<Button
							size='md'
							variant='filled'
							fullWidth
							color='cRed.0'
							component={Link}
							href='/checkout'
							classNames={{
								root: classes.checkoutBtnRoot,
							}}
							disabled={loading}
						>
							Check out
						</Button>
					</Card.Section>
				</Card>
			</Flex>
			// <Grid gutter='xl' mt='xl'>
			// 	<Grid.Col span={4}>
			// 		<Card radius='sm'>
			// 			<Card.Section withBorder py='xs' px={0}>
			// 				<Title order={4} c='gray.7' tt='uppercase'>
			// 					Coupon Code:
			// 				</Title>
			// 			</Card.Section>

			// 			<Card.Section py='xs' px={0}>
			// 				<Stack>
			// 					<Flex gap={8} align='flex-end'>
			// 						<TextInput
			// 							placeholder='Enter your coupon code'
			// 							label='Enter your coupon code if you have one.'
			// 							size='md'
			// 							type='text'
			// 							classNames={{
			// 								label: classes.textInputLabel,
			// 								root: classes.textInputRoot,
			// 								input: classes.textInputInput,
			// 							}}
			// 						/>
			// 						<Button
			// 							size='md'
			// 							variant='outline'
			// 							classNames={{
			// 								root: classes.btnRoot,
			// 							}}
			// 						>
			// 							Apply
			// 						</Button>
			// 					</Flex>
			// 				</Stack>
			// 			</Card.Section>
			// 		</Card>
			// 	</Grid.Col>
			// 	<Grid.Col span={4}>
			// 		<Card radius='sm'>
			// 			<Card.Section withBorder py='xs' px={0}>
			// 				<Title order={4} c='gray.7' tt='uppercase'>
			// 					Gift Certificate:
			// 				</Title>
			// 			</Card.Section>

			// 			<Card.Section py='xs' px={0}>
			// 				<Stack>
			// 					<Flex gap={8} align='flex-end'>
			// 						<TextInput
			// 							placeholder='Add Certificate'
			// 							label='Enter your gift certificate if you have one.'
			// 							size='md'
			// 							type='text'
			// 							classNames={{
			// 								label: classes.textInputLabel,
			// 								root: classes.textInputRoot,
			// 								input: classes.textInputInput,
			// 							}}
			// 						/>
			// 						<Button
			// 							size='md'
			// 							variant='outline'
			// 							classNames={{
			// 								root: classes.btnRoot,
			// 							}}
			// 						>
			// 							Apply
			// 						</Button>
			// 					</Flex>
			// 				</Stack>
			// 			</Card.Section>
			// 		</Card>
			// 	</Grid.Col>
			// 	<Grid.Col span={4}>
			// 		<Card radius='sm'>
			// 			<Card.Section withBorder py='xs' px={0}>
			// 				<Title order={4} c='gray.7' tt='uppercase'>
			// 					Order Summary:
			// 				</Title>
			// 			</Card.Section>

			// 			<Card.Section withBorder py='xs' px={0}>
			// 				<Flex justify='space-between'>
			// 					<Title order={6} c='gray.7'>
			// 						Subtotal:
			// 					</Title>
			// 					<Title order={5} c='gray.7'>
			// 						GHS {roundedPriceTotal}
			// 					</Title>
			// 				</Flex>
			// 			</Card.Section>

			// 			<Card.Section py='xs' px={0}>
			// 				<Flex justify='space-between'>
			// 					<Title order={4} c='gray.8'>
			// 						Grand total:
			// 					</Title>
			// 					<Title order={4} c='gray.8'>
			// 						GHS {roundedPriceTotal}
			// 					</Title>
			// 				</Flex>
			// 			</Card.Section>

			// 			<Card.Section py='xs' px={0}>
			// 				<Button
			// 					size='md'
			// 					variant='filled'
			// 					fullWidth
			// 					color='cRed.0'
			// 					component={Link}
			// 					href='/checkout'
			// 					classNames={{
			// 						root: classes.checkoutBtnRoot,
			// 					}}
			// 					disabled={loading}
			// 				>
			// 					Check out
			// 				</Button>
			// 			</Card.Section>
			// 		</Card>
			// 	</Grid.Col>
			// </Grid>
		)
	}

	return <></>
}
export default CartFooterCards
