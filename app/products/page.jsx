import CustomBreadcrumbs from '@/components/CustomBreadcrumbs/CustomBreadcrumbs'
import {
	Box,
	Container,
	Flex,
	SimpleGrid,
	Stack,
} from '@mantine/core'
import classes from './page.module.scss'
import CategoriesCard from '@/components/CategoriesCard/CategoriesCard'
import { fetcher } from '@/utils/functions'
import PriceCard from '@/components/PriceCard/PriceCard'
import BrandsCard from '@/components/BrandsCard/BrandsCard'
import ProductCard from '@/components/ProductCard/ProductCard'
import ProductsPageToolbar from '@/components/ProductsPageToolbar/ProductsPageToolbar'
import CustomPagination from '@/components/CustomPagination/CustomPagination'

const ProductsPage = async ({ searchParams }) => {
	const category = searchParams?.category || null
	const brand = searchParams?.brand || null
	const priceMin = searchParams?.price_min || null
	const priceMax = searchParams?.price_max || null
	const sortBy = searchParams?.sort_by || 'newest'
	const perPage = searchParams?.per_page || '25'
	const page = searchParams?.page || '1'

	const {
		status,
		message,
		data: { products, categories, brands, settings },
	} = await fetcher('https://portal.bs42.net/api/frontendInitData')

	const copy = [...products].sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	)
	const newest20Products = copy.slice(0, 20)

	return (
		<>
			<CustomBreadcrumbs categories={categories} slug={category} />
			<Container size='xl' py='xl'>
				<Flex gap='lg'>
					<Stack
						w={{ base: '34.2%', md: '25.9%', lg: '20%' }}
						visibleFrom='sm'
						gap='xl'
					>
						<CategoriesCard categories={categories} slug={category} />
						<PriceCard priceMin={priceMin} priceMax={priceMax} />
						<BrandsCard brands={brands} slug={brand} />
					</Stack>

					<Box w={{ base: '100%', sm: '65.8', md: '75.1%', lg: '80%' }}>
						<ProductsPageToolbar slug={{ sortBy, perPage }} />
						<SimpleGrid
							cols={{ base: 2, sm: 3, md: 4 }}
							spacing={{ base: 'sm', sm: 'sm', md: 'md' }}
						>
							{newest20Products.map(product => (
								<ProductCard key={product._id} product={product} />
							))}
						</SimpleGrid>
						<CustomPagination slug={{ perPage, page }} />
					</Box>
				</Flex>
			</Container>
		</>
	)
}
export default ProductsPage
