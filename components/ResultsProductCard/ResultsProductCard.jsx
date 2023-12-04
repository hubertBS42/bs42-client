import { arimo } from '@/utils/font'
import { Box, Flex, Stack, Text, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import classes from './ResultProductCard.module.scss'

const ResultsProductCard = ({ product, closeModal }) => {
	return (
		<Flex
			direction='row'
			gap='sm'
			align='center'
			py='.3em'
			className={classes.container}
		>
			<Box className={classes.imageWrapper}>
				<Image src={product?.images[0].url} alt={product?.title} fill />
			</Box>
			<Stack gap={2} justify='center'>
				<Link href={`/product/${product.slug}`} onClick={closeModal}>
					<Title
						order={4}
						size={12}
						classNames={{
							root: classes.titleRoot,
						}}
					>
						{product.title}
					</Title>
				</Link>
				<Text
					classNames={{
						root: classes.textRoot,
					}}
				>
					{product.brand.name}
				</Text>
			</Stack>
		</Flex>
	)
}
export default ResultsProductCard
