'use client'
import { Box, Button, Divider, Flex } from '@mantine/core'
import CategoryCarousel from '../CategoryCarousel/CategoryCarousel'
import Section from '../Section/Section'
import {
	extractCategoryIds,
	fetcher,
	groupCategories,
} from '@/utils/functions'
import { Carousel } from '@mantine/carousel'
import ProductCard from '../ProductCard/ProductCard'
import { useEffect, useRef, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import classes from './SpecificProductsShowcase.module.scss'
import Link from 'next/link'

const SpecificProductsShowcase = ({ target }) => {
	const autoplay = useRef(Autoplay({ delay: 4000 }))
	const [products, setProducts] = useState([])
	const [categories, setCategories] = useState([])
	const [rate, setRate] = useState(0)

	useEffect(() => {
		const fetchData = async () => {
			const [{ products }, { currency }, data] = await Promise.all([
				fetcher('https://portal.bs42.net/api/frontend/products/all'),
				fetcher('https://portal.bs42.net/api/frontend/currency/active'),
				fetcher('https://portal.bs42.net/api/frontend/categories'),
			])
			const groupedCategories = groupCategories(data.categories)
			setProducts(products)

			setCategories(groupedCategories)

			if (currency.isCustomRate) {
				setRate(currency.customRate)
			} else {
				setRate(currency.history[0].rate)
			}
		}

		fetchData()
	}, [])

	const category = categories.find(
		category => category.name === target
	)

	const categoryIds = extractCategoryIds(category)

	const filteredProducts = products
		.filter(product => categoryIds.includes(product.category._id))
		.slice(0, 10)

	const slides = filteredProducts.map(product => (
		<Carousel.Slide key={product._id}>
			<ProductCard product={product} rate={rate} />
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
				<Button
					className='viewMoreBtn'
					component={Link}
					href={`/products?category=${category?.slug}`}
				>
					View more
				</Button>
			</Flex>
		</Section>
	)
}
export default SpecificProductsShowcase
