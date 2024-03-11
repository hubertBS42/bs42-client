'use client'
import {
	Box,
	Button,
	Container,
	Flex,
	Grid,
	Group,
	NumberInput,
	Overlay,
	Rating,
	Stack,
	Tabs,
	Text,
	Title,
} from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import Image from 'next/image'
import classes from './ProductDetailsTopSection.module.scss'
import { useEffect, useState } from 'react'
import { IconFlame } from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import { getCurrency } from '@/redux/features/currency/currencySlice'
import { fetcher, roundMoney } from '@/utils/functions'
import { productQtyInCartSelector } from '@/redux/features/cart/cartSlice'
import { modifyCart } from '@/redux/features/cart/cartActions'
import useSWR from 'swr'

const ProductDetailsTopSection = ({ product, rate }) => {
	const [currentImage, setCurrentImage] = useState(0)
	const [embla, setEmbla] = useState(null)
	const [loading, setLoading] = useState(false)
	const [quantity, setQuantity] = useState(1)
	// const currency = useSelector(getCurrency)
	const curQuantity = useSelector(
		productQtyInCartSelector(product._id)
	)

	useEffect(() => {
		if (curQuantity) {
			setQuantity(curQuantity)
		}
	}, [curQuantity])

	const handleCarouselChange = index => embla.scrollTo(index)

	const handleChange = value => setQuantity(value)

	const handleAdd = async () => {
		setLoading(true)
		await modifyCart(product, quantity)
		setLoading(false)
	}

	// let rate = null

	// const { data, error, isLoading } = useSWR(
	// 	'https://portal.bs42.net/api/frontend/currency/active',
	// 	fetcher
	// )

	// if (!isLoading && !error) {
	// 	rate = data.currency.isCustomRate
	// 		? data.currency.customRate
	// 		: data.currency.history[0].rate
	// }

	const roundedSellPrice = roundMoney(product.sellPrice * rate)

	const MainSlides = product.images.map(image => (
		<Carousel.Slide key={image._id}>
			<Box className={classes.carouselImageWrapper}>
				<Image
					src={image.url}
					alt={product.title}
					fill
					className={classes.carouselImage}
				/>
			</Box>
		</Carousel.Slide>
	))

	const ThumbnailSlides = product.images.map((image, i) => (
		<Carousel.Slide key={image._id}>
			<Box
				className={`${classes.carouselImageWrapper} ${
					classes.thumbnail
				} ${currentImage === i && classes.active}`}
				onClick={() => handleCarouselChange(i)}
			>
				<Image
					src={image.url}
					alt={product.title}
					fill
					className={classes.carouselImage}
				/>
				{currentImage !== i && (
					<Overlay color='#fff' backgroundOpacity={0.5} />
				)}
			</Box>
		</Carousel.Slide>
	))

	return (
		<Container
			size='xl'
			style={{ paddingTop: '3vw', paddingBottom: '3vw' }}
		>
			<Grid>
				<Grid.Col span={{ base: 12, sm: 6 }}>
					<Stack>
						<Carousel
							height={400}
							onSlideChange={index => setCurrentImage(index)}
							// initialSlide={currentImage}
							getEmblaApi={setEmbla}
							className={`${classes.carouselContainer} ${classes.main}`}
						>
							{MainSlides}
						</Carousel>
						<Carousel
							height={70}
							slideSize={{
								base: '100%',
								sm: '16.6667%',
							}}
							loop={false}
							align='start'
							slidesToScroll='auto'
							slideGap='md'
							withControls={false}
							className={classes.carouselContainer}
							style={{ padding: '2px' }}
							visibleFrom='sm'
						>
							{ThumbnailSlides}
						</Carousel>
					</Stack>
				</Grid.Col>
				<Grid.Col span={{ base: 12, sm: 6 }}>
					<Stack mb='lg'>
						<Title className={classes.brand}>
							{product.brand.name} &reg;
						</Title>
						<Title className={classes.title}>{product.title}</Title>
						<Group className={classes.rating} gap='xl'>
							<Rating />
							<Text className={classes.text}>No Reviews Yet</Text>
							<Text className={classes.text}>Write A Review</Text>
						</Group>
					</Stack>
					<Group gap='xl' mb='lg'>
						<Text className={classes.price}>GHS {roundedSellPrice}</Text>
						<Flex className={classes.salesHistory} align='center'>
							<IconFlame className={classes.icon} />
							<Text className={classes.text}>
								5 sold in the last 24 hours.
							</Text>
						</Flex>
					</Group>

					<Stack className={classes.metadata} mb='lg'>
						<Group>
							<Text className={classes.metadataTitle}>SKU:</Text>
							<Text className={classes.value}>N/A</Text>
						</Group>

						<Group>
							<Text className={classes.metadataTitle}>Availability:</Text>
							<Text className={classes.value}>
								Usually ships within 3 days
							</Text>
						</Group>

						<Group>
							<Text className={classes.metadataTitle}>Shipping:</Text>
							<Text className={classes.value}>Calculated at checkout</Text>
						</Group>
					</Stack>

					<Stack>
						<Group className={classes.metadata}>
							<Text className={classes.metadataTitle}>Current Stock:</Text>
							<Text className={classes.value}>{product.countInStock}</Text>
						</Group>

						<Flex align='flex-end' gap={20}>
							<NumberInput
								label='Quantity:'
								classNames={{
									label: classes.numberInputLabel,
									input: classes.numberInputInput,
									root: classes.numberInputRoot,
								}}
								allowNegative={false}
								clampBehavior='strict'
								allowDecimal={false}
								size='md'
								value={quantity}
								onChange={handleChange}
								disabled={loading || product.countInStock === 0}
								min={1}
								max={product.countInStock}
							/>

							{product.countInStock > 0 ? (
								<Button
									size='md'
									variant='filled'
									classNames={{
										root: classes.btnRoot,
									}}
									loading={loading}
									onClick={handleAdd}
								>
									{curQuantity ? 'Update Cart' : 'Add to cart'}
								</Button>
							) : (
								<Button
									size='md'
									variant='filled'
									classNames={{
										root: classes.disabledBtnRoot,
									}}
									disabled
								>
									Sold out
								</Button>
							)}
						</Flex>
					</Stack>
				</Grid.Col>
			</Grid>
		</Container>
	)
}
export default ProductDetailsTopSection
