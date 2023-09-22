'use client'
import { Box, Button, Divider, Flex } from '@mantine/core'
import CategoryCarousel from '../CategoryCarousel/CategoryCarousel'
import Section from '../Section/Section'
import { useSelector } from 'react-redux'
import { selectAllCategories } from '@/redux/features/categories/categoriesSlice'
import {
	extractCategoryIds,
	formatCategoriesForHeader,
} from '@/utils/functions'
import { selectAllProducts } from '@/redux/features/products/productsSlice'
import { Carousel } from '@mantine/carousel'
import ProductCard from '../ProductCard/ProductCard'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import classes from './SpecificProductsShowcase.module.scss'

const SpecificProductsShowcase = ({ target }) => {
	const autoplay = useRef(Autoplay({ delay: 4000 }))
	const categories = formatCategoriesForHeader(
		useSelector(selectAllCategories)
	)
	const products = useSelector(selectAllProducts)

	const category = categories.find(
		category => category.name === target
	)

	const categoryIds = extractCategoryIds(category)

	const filteredProducts = products
		.filter(product => categoryIds.includes(product.category._id))
		.slice(0, 10)

	const slides = filteredProducts.map(product => (
		<Carousel.Slide key={product._id}>
			<ProductCard product={product} />
		</Carousel.Slide>
	))

	return (
		<Section>
			<Divider
				mb={20}
				label={category?.name}
				classNames={{
					label: classes.label,
				}}
				hiddenFrom='sm'
			/>
			<Flex gap='md' align='flex-start'>
				<Box
					w={{ base: '34.2%', md: '25.9%', lg: '20%' }}
					visibleFrom='sm'
				>
					<CategoryCarousel category={category} />
				</Box>

				<Box w={{ base: '100%', sm: '65.8', md: '75.1%', lg: '80%' }}>
					<Carousel
						height='100%'
						slideSize={{ base: '50%', xs: '33.33%', md: '25%' }}
						slideGap='md'
						loop
						align='start'
						plugins={[autoplay.current]}
						onMouseEnter={autoplay.current.stop}
						onMouseLeave={autoplay.current.reset}
						slidesToScroll={2}
						withControls={false}
					>
						{slides}
					</Carousel>
				</Box>
			</Flex>

			<Flex justify='center' mt={40} hiddenFrom='sm'>
				<Button className='viewMoreBtn'>View more</Button>
			</Flex>
		</Section>
	)
}
export default SpecificProductsShowcase
