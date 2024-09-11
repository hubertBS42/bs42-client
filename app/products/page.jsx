import CustomBreadcrumbs from '@/components/CustomBreadcrumbs/CustomBreadcrumbs'
import { Box, Container, Flex, Stack } from '@mantine/core'
import classes from './page.module.scss'
import CategoriesCard from '@/components/CategoriesCard/CategoriesCard'
import {
	getBrands,
	getCategories,
	getCurrentRate,
} from '@/utils/functions'
import PriceCard from '@/components/PriceCard/PriceCard'
import BrandsCard from '@/components/BrandsCard/BrandsCard'
import FiltersCard from '@/components/FiltersCard/FiltersCard'
import ProductsShowcase from '@/components/ProductsShowcase/ProductsShowcase'
import LimitSelect from '@/components/LimitSelect/LimitSelect'
import SortBySelect from '@/components/SortBySelect/SortBySelect'
import ConditionCard from '@/components/ConditionCard/ConditionCard'

export async function generateMetadata({ searchParams }) {
	let categoryName
	const { categories } = await getCategories()

	if (searchParams.category) {
		const category = categories.find(
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
	const rateData = getCurrentRate()

	const [{ brands }, { categories }, { rate }] = await Promise.all([
		brandsData,
		categoriesData,
		rateData,
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
			<CustomBreadcrumbs categories={categories} brands={brands} />
			<Container size='xl' py='xl'>
				<Flex gap='lg'>
					<Stack w={{ md: '24.9%', lg: '20%' }} visibleFrom='md' gap='lg'>
						<FiltersCard
							categories={categories}
							brands={brands}
							prices={prices}
						/>
						<CategoriesCard categories={categories} />
						<PriceCard prices={prices} />
						<ConditionCard />
						<BrandsCard brands={brands} />
					</Stack>

					<Stack
						gap={0}
						w={{ base: '100%', sm: '100%', md: '76.1%', lg: '80%' }}
					>
						<Flex mb={30} justify='flex-end' gap={20} visibleFrom='md'>
							<LimitSelect />
							<SortBySelect />
						</Flex>

						<ProductsShowcase rate={rate} />
					</Stack>
				</Flex>
			</Container>
		</>
	)
}
export default ProductsPage
