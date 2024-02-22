'use client'

import { addToCart } from '@/redux/features/cart/cartActions'
import { getDateDifference, roundMoney } from '@/utils/functions'
import {
	Badge,
	Button,
	Card,
	Group,
	Rating,
	Skeleton,
	Stack,
	Text,
	Title,
	Tooltip,
} from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import classes from './ProductCard.module.scss'
import { useSelector } from 'react-redux'
import { getCurrency } from '@/redux/features/currency/currencySlice'
import { useState } from 'react'

const ProductCard = ({ product, border }) => {
	const [loading, setLoading] = useState(false)
	const currency = useSelector(getCurrency)
	const currentRate = currency.isCustomRate
		? currency.customRate
		: currency.history[0].rate
	const roundedSellPrice = roundMoney(product?.sellPrice * currentRate)
	const roundedDiscountPrice = roundMoney(
		(20 / 100) * product?.sellPrice * currentRate
	)

	const handleAdd = async () => {
		setLoading(true)
		await addToCart(product)
		setLoading(false)
	}

	return (
		<Card padding={!border ? 0 : 'sm'} withBorder={border} radius='sm'>
			<Link href={`/product/${product?.slug}`}>
				<Card.Section
					className={classes.imgWrapper}
					h={{ base: '100px', xs: '200px' }}
				>
					<Image
						src={product?.images[0].url}
						fill
						style={{ objectFit: 'cover' }}
						alt={product?.title}
						sizes='(min-width: 1400px) 245px, (min-width: 1000px) calc(16.84vw + 13px), (min-width: 780px) calc(25vw - 20px), (min-width: 600px) calc(33.75vw - 22px), (min-width: 560px) calc(-415vw + 2582px), 100vw'
					/>
					<Stack
						align='flex-end'
						spacing={5}
						className={classes.badgesWrapper}
					>
						{getDateDifference(product.createdAt) <= 7 && (
							<Badge
								radius='xs'
								size='sm'
								variant='filled'
								color='green.8'
								className={classes.badge}
							>
								New
							</Badge>
						)}

						{product.onSale && (
							<Badge
								radius='xs'
								size='sm'
								variant='filled'
								color='cRed.0'
								className={classes.badge}
							>
								On Sale
							</Badge>
						)}

						{product.countInStock < 1 && (
							<Badge
								radius='xs'
								size='sm'
								variant='filled'
								color='gray.6'
								className={classes.badge}
							>
								Sold out
							</Badge>
						)}
					</Stack>
				</Card.Section>
			</Link>

			<Stack gap={0} justify='center'>
				<Title
					order={4}
					className={classes.brand}
					mb={5}
					fz={{ base: '11px', xs: '12px' }}
				>
					{product?.brand.name}
				</Title>

				<Tooltip
					label={product?.title}
					withinPortal
					style={{ fontSize: 11 }}
				>
					<Text
						lineClamp={1}
						className={classes.productTitle}
						mb={6}
						fz={{ base: '11px', xs: '12px' }}
						lh={{ base: '20px', xs: '22px' }}
						component={Link}
						href={`/product/${product?.slug}`}
					>
						{product?.title}
					</Text>
				</Tooltip>

				<Rating value={0} fractions={2} readOnly size='xs' mb={5} />

				{product?.onSale ? (
					<Group gap={5} className={classes.productPriceDiscount} mb={10}>
						<span className={classes.original}>GHS {roundedSellPrice}</span>
						<span className={classes.discounted}>
							GHS {roundedDiscountPrice}
						</span>
					</Group>
				) : (
					<Text className={classes.productPrice} mb={10}>
						GHS {roundedSellPrice}
					</Text>
				)}
				<Button
					size='md'
					variant='outline'
					color='gray.5'
					className={classes.addToCartBtn}
					disabled={product.countInStock < 1}
					onClick={handleAdd}
					loading={loading}
				>
					{product.countInStock < 1 ? 'Sold Out' : 'Add to Cart'}
				</Button>
			</Stack>
		</Card>
	)
}
export default ProductCard
