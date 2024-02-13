'use client'

import { SimpleGrid, Stack, Text, Title } from '@mantine/core'
import BlogCard from '../BlogCard/BlogCard'
import { IconClipboardText } from '@tabler/icons-react'
import CustomPagination from '../CustomPagination/CustomPagination'
import { useSearchParams } from 'next/navigation'
import { fetcher } from '@/utils/functions'
import useSWR from 'swr'
import LoadingProductCards from '../LoadingProductCards/LoadingProductCards'

const BlogsShowcase = () => {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)

	// const category = params.get('category')
	// const brand = params.get('brand')
	// const condition = params.get('condition')
	// const minPrice = params.get('min_price')
	// const maxPrice = params.get('max_price')
	const q = params.get('q')
	const author = params.get('author')
	const startDate = params.get('startDate')
	const endDate = params.get('endDate')
	const sortBy = params.get('sort_by') || 'newest'
	const limit = params.get('limit') || '25'
	const page = params.get('page') || '1'

	const { data, error, isLoading } = useSWR(
		`https://portal.bs42.net/api/frontend/blogs?q=${q}&limit=${limit}&page=${page}&sortBy=${sortBy}&author=${author}&startDate=${startDate}&endDate=${endDate}`,
		fetcher
	)

	return (
		<>
			{!isLoading ? (
				data?.blogs?.length > 0 ? (
					<>
						<SimpleGrid
							cols={{ base: 2, sm: 3, md: 4 }}
							spacing={{ base: 'sm', sm: 'sm', md: 'md' }}
						>
							{data?.blogs.map(blog => (
								<BlogCard key={blog._id} data={blog} />
							))}
						</SimpleGrid>
						<CustomPagination count={data.count} />
					</>
				) : (
					<Stack align='center' mt={130}>
						<IconClipboardText
							size={100}
							color='var(--mantine-color-gray-5)'
						/>
						<Title order={2} c='var(--mantine-color-gray-5)'>
							No Blogs Found
						</Title>
						<Text c='var(--mantine-color-gray-5)'>
							Your search did not match any blogs.
						</Text>
					</Stack>
				)
			) : (
				<LoadingProductCards />
			)}
		</>
	)
}
export default BlogsShowcase
