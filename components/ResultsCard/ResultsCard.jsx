import { arimo } from '@/utils/font'
import { Box, Flex, Stack, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

const ResultsCard = () => {
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
			<Stack justify='center'>
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
						Networking
					</Title>
				</Link>
			</Stack>
		</Flex>
	)
}
export default ResultsCard
