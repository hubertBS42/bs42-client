'use client'

import { SimpleGrid, Stack, Text, Title } from '@mantine/core'
import ProductCard from '../ProductCard/ProductCard'
import { IconShoppingBagX } from '@tabler/icons-react'
import CustomPagination from '../CustomPagination/CustomPagination'
import { useSearchParams } from 'next/navigation'
import { fetcher } from '@/utils/functions'
import useSWR from 'swr'
import LoadingProductCards from '../LoadingProductCards/LoadingProductCards'

const ProductsShowcase = () => {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)

	const category = params.get('category')
	const brand = params.get('brand')
	const condition = params.get('condition')
	const minPrice = params.get('min_price')
	const maxPrice = params.get('max_price')
	const sortBy = params.get('sort_by') || 'newest'
	const limit = params.get('limit') || '25'
	const page = params.get('page') || '1'

	const { data, error, isLoading } = useSWR(
		`https://portal.bs42.net/api/frontend/products?category=${category}&brand=${encodeURIComponent(
			brand
		)}&minPrice=${minPrice}&maxPrice=${maxPrice}&limit=${limit}&page=${page}&sortBy=${sortBy}&condition=${condition}`,
		fetcher
	)

	return (
		<>
			{!isLoading ? (
				data.products.length > 0 ? (
					<>
						<SimpleGrid
							cols={{ base: 2, sm: 3, md: 4 }}
							spacing={{ base: 'sm', sm: 'sm', md: 'md' }}
						>
							{data.products.map(product => (
								<ProductCard
									key={product._id}
									product={product}
									cardLoading={isLoading}
								/>
							))}
						</SimpleGrid>
						<CustomPagination count={data.count} />
					</>
				) : (
					<Stack align='center' mt={130}>
						<IconShoppingBagX
							size={100}
							color='var(--mantine-color-gray-5)'
						/>
						<Title order={2} c='var(--mantine-color-gray-5)'>
							No Products Found
						</Title>
						<Text c='var(--mantine-color-gray-5)'>
							Your search did not match any products.
						</Text>
					</Stack>
				)
			) : (
				<LoadingProductCards />
			)}
		</>
	)
}
export default ProductsShowcase
