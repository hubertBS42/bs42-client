'use client'
import { arimo, rajdhani } from '@/utils/font'
import {
	capitalizeFirstLetter,
	formatDate,
	roundMoney,
} from '@/utils/functions'
import {
	Button,
	Divider,
	Flex,
	SimpleGrid,
	Stack,
	Text,
} from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'
import CheckoutProductCard from '../CheckoutProductCard/CheckoutProductCard'
import { useEffect } from 'react'
import Link from 'next/link'
import classes from './OrderReceived.module.scss'

const OrderReceived = ({ order }) => {
	// useEffect(() => {
	// 	document.body.style.backgroundColor = '#F8F9FA'
	// 	document.body.style.height = 'auto'
	// })
	return (
		<Stack maw={700} mx='auto'>
			<Stack align='center' gap={7}>
				<IconCircleCheck color='green' size={48} stroke={1.3} />
				<Text
					ta='center'
					ff={rajdhani.style.fontFamily}
					fw={600}
					fz={21}
					lh={1.3}
				>
					Thank you <br /> Your order has been received
				</Text>
				<Text ta='center' ff={arimo.style.fontFamily} fz={14} c='gray.8'>
					You will receive an email with your invoice once the order is
					confirmed
				</Text>
			</Stack>

			<Stack
				p={15}
				style={theme => ({
					border: `1px solid ${theme.colors.gray[2]}`,
					backgroundColor: 'white',
				})}
				gap={0}
			>
				<Text
					ff={rajdhani.style.fontFamily}
					fw={600}
					fz={17}
					tt='uppercase'
					mb='sm'
				>
					Order details
				</Text>

				<Stack gap={4} c='gray.8'>
					<Flex justify='space-between'>
						<Text fz={14}>Order number:</Text>
						<Text fz={14} fw={500}>
							{order.orderNumber}
						</Text>
					</Flex>

					<Flex justify='space-between'>
						<Text fz={14}>Date:</Text>
						<Text fz={14} fw={500}>
							{formatDate(order.createdAt)}
						</Text>
					</Flex>

					<Flex justify='space-between'>
						<Text fz={14}>Payment Method:</Text>
						<Text fz={14} fw={500}>
							{capitalizeFirstLetter(order.payment.method)}
						</Text>
					</Flex>

					<Flex justify='space-between'>
						<Text fz={14}>Shipping Method:</Text>
						<Text fz={14} fw={500}>
							{capitalizeFirstLetter(order.shipping.method)}
						</Text>
					</Flex>
				</Stack>

				<Divider my='sm' variant='dashed' />

				<Stack gap={4} c='gray.8'>
					<Flex justify='space-between'>
						<Text fz={14}>Subtotal:</Text>
						<Text fz={14} fw={500}>
							GHS {roundMoney(order.totalPrice * order.rate)}
						</Text>
					</Flex>

					<Flex justify='space-between'>
						<Text fz={14}>Total:</Text>
						<Text fz={14} fw={500}>
							GHS {roundMoney(order.totalPrice * order.rate)}
						</Text>
					</Flex>
				</Stack>
			</Stack>

			<Stack gap={0}>
				<Text
					ff={rajdhani.style.fontFamily}
					fw={600}
					fz={17}
					tt='uppercase'
					mb='sm'
				>
					Products
				</Text>
				{order &&
					order.products.map((product, i) => (
						<CheckoutProductCard key={i} item={product} rate={order.rate} />
					))}
			</Stack>

			<Stack gap={0}>
				<Text
					ff={rajdhani.style.fontFamily}
					fw={600}
					fz={17}
					tt='uppercase'
					mb='sm'
				>
					Customer Details
				</Text>
				<SimpleGrid spacing='md' cols={{ base: 1, sm: 2 }}>
					<Stack>
						<Stack gap={0}>
							<Text
								ff={rajdhani.style.fontFamily}
								fw={600}
								fz={14}
								tt='uppercase'
							>
								Contact
							</Text>
							<Text fz={14}>Email: {order.contact.email}</Text>
							<Text fz={14}>Phone: {order.contact.phone}</Text>
						</Stack>
					</Stack>

					<Stack gap={0}>
						<Text
							ff={rajdhani.style.fontFamily}
							fw={600}
							fz={14}
							tt='uppercase'
						>
							Billing address
						</Text>
						<Text fz={14}>
							{order.billing.firstName} {order.billing.lastName}
						</Text>
						<Text fz={14}>{order.billing.address}</Text>
						<Text fz={14}>
							{order.billing.town}, {order.billing.region}
						</Text>
						<Text fz={14}>{order.billing.digitalAddress}</Text>
					</Stack>

					{order.shipping.method === 'delivery' && (
						<Stack gap={0}>
							<Text
								ff={rajdhani.style.fontFamily}
								fw={600}
								fz={15}
								tt='uppercase'
							>
								Shipping address
							</Text>
							<Text fz={14}>
								{order.shipping.firstName} {order.shipping.lastName}
							</Text>
							<Text fz={14}>{order.shipping.address}</Text>
							<Text fz={14}>
								{order.shipping.town}, {order.shipping.region}
							</Text>
							<Text fz={14}>{order.shipping.digitalAddress}</Text>
						</Stack>
					)}
				</SimpleGrid>
			</Stack>

			<Button
				size='md'
				variant='filled'
				color='cRed.0'
				component={Link}
				href='/products'
				mt='xl'
				classNames={{
					root: classes.checkoutBtnRoot,
				}}
			>
				Continue Shopping
			</Button>
		</Stack>
	)
}
export default OrderReceived
