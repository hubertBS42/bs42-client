'use client'
import { Flex, Select } from '@mantine/core'
import classes from './ProductsPageToolbar.module.scss'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
const ProductsPageToolbar = () => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)

	const sortBy = params.get('sort_by') || 'newest'
	const limit = params.get('limit') || '25'

	const sortByData = [
		{ value: 'newest', label: 'Newest' },
		{ value: 'featured', label: 'Featured' },
		{ value: 'a-z', label: 'A - Z' },
		{ value: 'z-a', label: 'Z - A' },
		{ value: 'priceLow', label: 'Price: Lowest' },
		{ value: 'priceHigh', label: 'Price: Highest' },
	]

	const limitData = ['25', '50', '75', '100']

	const handleSort = sortParam => {
		if (sortParam) {
			params.set('sort_by', sortParam)
			params.set('page', 1)
			replace(`${pathname}?${params}`)
		}
	}

	const handleLimit = pagesParam => {
		if (pagesParam) {
			params.set('limit', pagesParam)
			params.set('page', 1)
			replace(`${pathname}?${params}`)
		}
	}
	return (
		<Flex mb={30} justify='flex-end' gap={20} visibleFrom='md'>
			<Select
				label='Sort by:'
				data={sortByData}
				withCheckIcon={false}
				allowDeselect={false}
				defaultValue={sortBy}
				classNames={{
					root: classes.selectRoot,
					label: classes.selectLabel,
				}}
				onChange={value => handleSort(value)}
			/>
			<Select
				label='Show:'
				data={limitData}
				withCheckIcon={false}
				allowDeselect={false}
				defaultValue={limit}
				classNames={{
					root: classes.selectRoot,
					label: classes.selectLabel,
					input: classes.selectInput,
				}}
				onChange={value => handleLimit(value)}
			/>
		</Flex>
	)
}
export default ProductsPageToolbar
