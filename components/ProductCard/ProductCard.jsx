'use client'

import {
	addToCart,
	modifyCart,
} from '@/redux/features/cart/cartActions'
import { getDateDifference, roundMoney } from '@/utils/functions'
import {
	Badge,
	Button,
	Card,
	Flex,
	Group,
	NumberInput,
	Rating,
	Stack,
	Text,
	Title,
	Tooltip,
} from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import classes from './ProductCard.module.scss'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { productQtyInCartSelector } from '@/redux/features/cart/cartSlice'

const ProductCard = ({ product, border, rate }) => {
	const [loading, setLoading] = useState(false)
	const [quantity, setQuantity] = useState(1)
	const roundedSellPrice = roundMoney(product?.sellPrice * rate)
	const roundedDiscountPrice = roundMoney(
		(20 / 100) * product?.sellPrice * rate
	)
	const curQuantity = useSelector(
		productQtyInCartSelector(product._id)
	)

	const inStock = product.count

	useEffect(() => {
		if (curQuantity) {
			setQuantity(curQuantity)
		}
	}, [curQuantity])

	const handleChange = value => setQuantity(value)

	// const handleAdd = async () => {
	// 		setLoading(true)
	// 		await modifyCart(product, quantity)
	// 		setLoading(false)
	// 	}

	const handleAdd = async () => {
		setLoading(true)
		await modifyCart(product, quantity)
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
						gap={3}
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

						{!inStock && (
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
					{product?.brand?.name}
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
				<Flex gap='xs' justify='center' direction='column'>
					<NumberInput
						// classNames={{
						// 	label: classes.numberInputLabel,
						// 	input: classes.numberInputInput,
						// 	root: classes.numberInputRoot,
						// }}
						allowNegative={false}
						clampBehavior='strict'
						allowDecimal={false}
						size='md'
						value={quantity}
						onChange={handleChange}
						disabled={loading || !inStock}
						min={1}
						max={product.count}
					/>
					<Button
						size='md'
						variant='outline'
						color='gray.5'
						className={classes.addToCartBtn}
						disabled={!inStock}
						onClick={handleAdd}
						loading={loading}
					>
						{inStock
							? curQuantity
								? 'Update cart'
								: 'Add to Cart'
							: 'Sold Out'}
					</Button>
				</Flex>
			</Stack>
		</Card>
	)
}
export default ProductCard
