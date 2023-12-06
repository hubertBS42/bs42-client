'use client'
import Section from '../Section/Section'
import { Carousel } from '@mantine/carousel'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Button, Divider, Flex } from '@mantine/core'
import { useSelector } from 'react-redux'
import { selectAllProducts } from '@/redux/features/products/productsSlice'
import ProductCard from '../ProductCard/ProductCard'
import classes from './FeaturedProductsShowcase.module.scss'
import Link from 'next/link'

const FeaturedProductsShowcase = () => {
	const autoplay = useRef(Autoplay({ delay: 4000 }))
	const data = useSelector(selectAllProducts)
	const products = data
		.filter(product => product.featured)
		.slice(0, 15)

	const slides = products.map(product => (
		<Carousel.Slide key={product._id}>
			<ProductCard product={product} />
		</Carousel.Slide>
	))

	return (
		<Section>
			<Divider mb={20} label='Featured Products' classNames={classes} />

			<Carousel
				height='100%'
				loop
				align='start'
				plugins={[autoplay.current]}
				onMouseEnter={autoplay.current.stop}
				onMouseLeave={autoplay.current.reset}
				slideSize={{ base: '50%', xs: '33.33%', sm: '25%', md: '20%' }}
				slideGap={{ base: 'sm', xs: 'md' }}
				slidesToScroll={2}
				withControls={false}
			>
				{slides}
			</Carousel>

			<Flex justify='center' mt={40}>
				<Button
					className='viewMoreBtn'
					component={Link}
					href='products?sort_by=featured'
				>
					View more
				</Button>
			</Flex>
		</Section>
	)
}
export default FeaturedProductsShowcase
