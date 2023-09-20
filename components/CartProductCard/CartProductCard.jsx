import { arimo, rajdhani } from '@/utils/font'
import { Box, Flex, Stack, Text, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

const CartProductCard = ({ item }) => {
	return (
		<Flex
			direction='row'
			gap='sm'
			align='center'
			py='.3em'
			style={theme => ({
				borderBottom: `1px solid ${theme.colors.gray[2]}`,

				'&:last-child': {
					border: 'none',
				},
			})}
		>
			<Box style={{ height: 90, width: 90, position: 'relative' }}>
				<Image
					src={item.product.images[0].url}
					alt={item.product.title}
					fill
					style={{ objectFit: 'contain' }}
				/>
			</Box>
			<Stack gap={2} justify='center'>
				<Title
					order={4}
					style={theme => ({
						fontSize: 12,
						fontWeight: 400,
						color: theme.colors.gray[6],
						fontFamily: arimo.style.fontFamily,
					})}
				>
					{item.product.brand.name}
				</Title>

				<Link href='/'>
					<Title
						order={3}
						style={theme => ({
							fontSize: 12,
							fontWeight: 700,
							color: theme.colors.blue[9],
							fontFamily: arimo.style.fontFamily,
						})}
					>
						{item.product.title}
					</Title>
				</Link>
				<Text
					sx={theme => ({
						fontSize: 14,
						fontWeight: 700,
						color: theme.colors.gray[8],
						fontFamily: rajdhani.style.fontFamily,
					})}
				>
					{item.qty} x GHC {item.product.sellPrice}
				</Text>
			</Stack>
		</Flex>
	)
}
export default CartProductCard
