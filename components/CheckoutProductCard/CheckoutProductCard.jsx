'use client'
import { Box, Grid, Group, Stack, Text, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import classes from './CheckoutProductCard.module.scss'
import { roundMoney } from '@/utils/functions'

const CheckoutProductCard = ({ item, rate }) => {
	const roundedSellPrice = roundMoney(item.product.sellPrice * rate)
	return (
		<Grid align='center'>
			<Grid.Col span={6}>
				<Group>
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
					</Stack>
				</Group>
			</Grid.Col>
			<Grid.Col span={3} ta='center'>
				<Text className={classes.quantity}>x {item.quantity}</Text>
			</Grid.Col>
			<Grid.Col span={3} ta='end'>
				<Text className={classes.price}> GHS {roundedSellPrice}</Text>
			</Grid.Col>
		</Grid>
	)
}
export default CheckoutProductCard
