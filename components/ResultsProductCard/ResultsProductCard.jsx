'use client'
import { arimo } from '@/utils/font'
import { Badge, Box, Flex, Stack, Text, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import classes from './ResultProductCard.module.scss'

const ResultsProductCard = ({ product, closeModal }) => {
	return (
		<Link
			href={`/product/${product.slug}`}
			onClick={closeModal}
			className={classes.container}
		>
			<Flex
				direction='row'
				py='.3em'
				justify='space-between'
				align='center'
				// onClick={() => {
				// 	closeModal()
				// 	router.push(`/product/${product.slug}`)
				// }}
			>
				<Flex direction='row' gap='sm' align='center'>
					<Box className={classes.imageWrapper}>
						<Image src={product?.images[0].url} alt={product?.title} fill />
					</Box>
					<Stack gap={2} justify='center'>
						{/* <Link href={`/product/${product.slug}`} onClick={closeModal}> */}
						<Title
							order={4}
							size={12}
							classNames={{
								root: classes.titleRoot,
							}}
						>
							{product.title}
						</Title>
						{/* </Link> */}
						<Text
							classNames={{
								root: classes.textRoot,
							}}
						>
							{product.brand.name}
						</Text>
					</Stack>
				</Flex>
				<Badge
					classNames={{
						root: classes.badgeRoot,
					}}
					size='xs'
					color={product.count > 0 ? 'green' : 'gray'}
				>
					{product.count > 0 ? 'In stock' : 'Sold out'}
				</Badge>
			</Flex>
		</Link>
	)
}
export default ResultsProductCard
