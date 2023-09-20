import { arimo } from '@/utils/font'
import { Box, Flex, Stack, Text, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

const ResultsProductCard = () => {
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
			<Box style={{ height: 50, width: 50, position: 'relative' }}>
				<Image
					src='/images/testImage.jpg'
					alt='productTitle'
					fill
					style={{ objectFit: 'contain' }}
				/>
			</Box>
			<Stack gap={2} justify='center'>
				<Link href='/'>
					<Title
						order={4}
						size={12}
						style={theme => ({
							fontFamily: arimo.style.fontFamily,
							fontWeight: 700,
							color: theme.colors.blue[9],
						})}
					>
						CCTV Camera
					</Title>
				</Link>
				<Text
					style={theme => ({
						fontWeight: 400,
						fontSize: 11,
						color: theme.colors.gray[8],
					})}
				>
					SKU: 0000
				</Text>
			</Stack>
		</Flex>
	)
}
export default ResultsProductCard
