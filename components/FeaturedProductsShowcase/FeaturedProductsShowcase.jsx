'use client'
import Section from '../Section/Section'
import { Carousel } from '@mantine/carousel'
import { useEffect, useRef, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Button, Divider, Flex } from '@mantine/core'
import ProductCard from '../ProductCard/ProductCard'
import classes from './FeaturedProductsShowcase.module.scss'
import Link from 'next/link'
import { fetcher } from '@/utils/functions'

const FeaturedProductsShowcase = () => {
	const autoplay = useRef(Autoplay({ delay: 4000 }))
	const [products, setProducts] = useState([])
	const [rate, setRate] = useState(0)

	useEffect(() => {
		const fetchProductsAndRate = async () => {
			const [{ products }, { currency }] = await Promise.all([
				fetcher(
					'https://portal.bs42.net/api/frontend/products?sortBy=featured&limit=10'
				),
				fetcher('https://portal.bs42.net/api/frontend/currency/active'),
			])

			setProducts(products)

			if (currency.isCustomRate) {
				setRate(currency.customRate)
			} else {
				setRate(currency.history[0].rate)
			}
		}

		fetchProductsAndRate()
	}, [])

	let slides = []

	slides = products.map(product => (
		<Carousel.Slide key={product._id}>
			<ProductCard product={product} rate={rate} />
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
