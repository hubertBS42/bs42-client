import CustomBreadcrumbs from '@/components/CustomBreadcrumbs/CustomBreadcrumbs'
import { Box, Container, Flex, Stack } from '@mantine/core'
import classes from './page.module.scss'
import CategoriesCard from '@/components/CategoriesCard/CategoriesCard'
import { getBrands, getCategories } from '@/utils/functions'
import PriceCard from '@/components/PriceCard/PriceCard'
import BrandsCard from '@/components/BrandsCard/BrandsCard'
import FiltersCard from '@/components/FiltersCard/FiltersCard'
import ProductsShowcase from '@/components/ProductsShowcase/ProductsShowcase'
import ProductsPageToolbar from '@/components/ProductsPageToolbar/ProductsPageToolbar'

export async function generateMetadata({ searchParams }) {
	let categoryName
	const categoriesData = await getCategories()

	if (searchParams.category) {
		const category = categoriesData.data.find(
			category => category.slug === searchParams.category
		)

		categoryName = category.name
	} else {
		categoryName = 'All Products'
	}

	return {
		title: `${categoryName} - BS42.NET`,
	}
}

const ProductsPage = async () => {
	const brandsData = getBrands()
	const categoriesData = getCategories()

	const [brands, categories] = await Promise.all([
		brandsData,
		categoriesData,
	])

	const prices = [
		{ label: 'Under GHS1000', min: null, max: 1000 },
		{ label: 'GHS1000 - GHS2000', min: 1000, max: 2000 },
		{ label: 'GHS2000 - GHS3000', min: 2000, max: 3000 },
		{ label: 'GHS3000 - GHS4000', min: 3000, max: 4000 },
		{ label: 'Over GHS4000', min: 4000, max: null },
	]

	return (
		<>
			<CustomBreadcrumbs categories={categories.data} />
			<Container size='xl' py='xl'>
				<Flex gap='lg'>
					<Stack
						w={{ base: '34.2%', md: '25.9%', lg: '20%' }}
						visibleFrom='sm'
						gap='lg'
					>
						<FiltersCard
							categories={categories.data}
							brands={brands.data}
							prices={prices}
						/>
						<CategoriesCard categories={categories.data} />
						<PriceCard prices={prices} />
						<BrandsCard brands={brands.data} />
					</Stack>

					<Box w={{ base: '100%', sm: '65.8', md: '75.1%', lg: '80%' }}>
						<ProductsPageToolbar />
						<ProductsShowcase />
					</Box>
				</Flex>
			</Container>
		</>
	)
}
export default ProductsPage
