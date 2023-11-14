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
import { useState } from 'react'
import { rajdhani } from '@/utils/font'
import { IconFlame } from '@tabler/icons-react'

const ProductDetailsTopSection = ({ data }) => {
	const [currentImage, setCurrentImage] = useState(0)

	const MainSlides = data.images.map(image => (
		<Carousel.Slide key={image._id}>
			<Box className={classes.carouselImageWrapper}>
				<Image
					src={image.url}
					alt={data.title}
					fill
					className={classes.carouselImage}
				/>
			</Box>
		</Carousel.Slide>
	))

	const ThumbnailSlides = data.images.map((image, i) => (
		<Carousel.Slide key={image._id}>
			<Box
				className={`${classes.carouselImageWrapper} ${
					classes.thumbnail
				} ${currentImage === i && classes.active}`}
				onClick={() => setCurrentImage(i)}
			>
				<Image
					src={image.url}
					alt={data.title}
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
						<Title className={classes.brand}>{data.brand.name} &reg;</Title>
						<Title className={classes.title}>{data.title} &reg;</Title>
						<Group className={classes.rating} gap='xl'>
							<Rating />
							<Text className={classes.text}>No Reviews Yet</Text>
							<Text className={classes.text}>Write A Review</Text>
						</Group>
					</Stack>
					<Group gap='xl' mb='lg'>
						<Text className={classes.price}>GHS {data.sellPrice}</Text>
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
							<Text className={classes.value}>7</Text>
						</Group>

						<Flex align='flex-end' gap={150}>
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
								defaultValue={1}
							/>
							<Button
								size='md'
								variant='filled'
								classNames={{
									root: classes.btnRoot,
								}}
								href=''
							>
								Add to cart
							</Button>
						</Flex>
					</Stack>
				</Grid.Col>
			</Grid>
		</Container>
	)
}
export default ProductDetailsTopSection
