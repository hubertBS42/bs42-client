'use client'
import { Box, Button, Divider, Flex, SimpleGrid } from '@mantine/core'
import Section from '../Section/Section'
import ProductCard from '../ProductCard/ProductCard'
import classes from './YouMightLike.module.scss'
import { useEffect, useState } from 'react'
import { fetcher } from '@/utils/functions'
import Link from 'next/link'

const YouMightLike = () => {
	const [products, setProducts] = useState([])
	const [rate, setRate] = useState(0)

	useEffect(() => {
		const fetchData = async () => {
			const [{ products }, { currency }] = await Promise.all([
				fetcher(
					'https://portal.bs42.net/api/frontend/products?sortBy=oldest&limit=10'
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

		fetchData()
	}, [])

	return (
		<Section grayBg>
			<Box>
				<Divider
					mb={30}
					label='You may also like'
					labelPosition='center'
					classNames={{
						label: classes.label,
					}}
				/>

				<SimpleGrid
					cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
					spacing={{ base: 'sm', sm: 'sm', md: 'md' }}
				>
					{products.map(product => (
						<ProductCard
							key={product._id}
							border
							product={product}
							rate={rate}
						/>
					))}
				</SimpleGrid>
				<Flex justify='center' mt={40}>
					<Button
						className='viewMoreBtn'
						component={Link}
						href='products?sort_by=oldest'
					>
						View more
					</Button>
				</Flex>
			</Box>
		</Section>
	)
}
export default YouMightLike
