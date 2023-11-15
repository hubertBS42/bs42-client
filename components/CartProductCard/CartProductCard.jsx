import { arimo, rajdhani } from '@/utils/font'
import { Box, Flex, Stack, Text, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import classes from './CartProductCard.module.scss'
import { useSelector } from 'react-redux'
import { getSettings } from '@/redux/features/settings/settingsSlice'
import { roundMoney } from '@/utils/functions'

const CartProductCard = ({ item }) => {
	const settings = useSelector(getSettings)
	const currentRate = settings[0].exchangeRate.currentRate
	const roundedSellPrice = roundMoney(
		item.product.sellPrice * currentRate
	)
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

				<Link href='/'>
					<Title order={3} className={classes.title}>
						{item.product.title}
					</Title>
				</Link>
				<Text className={classes.price}>
					{item.quantity} x GHS {roundedSellPrice}
				</Text>
			</Stack>
		</Flex>
	)
}
export default CartProductCard
