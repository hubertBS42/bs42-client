'use client'
import { Flex, Select } from '@mantine/core'
import classes from './ProductsPageToolbar.module.scss'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
const ProductsPageToolbar = ({ slug }) => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)

	const sortByData = [
		{ value: 'newest', label: 'Newest' },
		{ value: 'featured', label: 'Featured' },
		{ value: 'best-selling', label: 'Best Selling' },
		{ value: 'a-z', label: 'A - Z' },
		{ value: 'z-a', label: 'Z - A' },
		{ value: 'priceAscending', label: 'Price: Ascending' },
		{ value: 'priceDescending', label: 'Price: Descending' },
	]

	const limitData = ['25', '50', '75', '100']

	const handleSort = sortParam => {
		if (sortParam) {
			params.set('sort_by', sortParam)
			replace(`${pathname}?${params}`)
		}
	}

	const handleLimit = pagesParam => {
		if (pagesParam) {
			params.set('limit', pagesParam)
			replace(`${pathname}?${params}`)
		}
	}
	return (
		<Flex mb={30} justify='flex-end' gap={80}>
			<Select
				label='Sort by:'
				data={sortByData}
				withCheckIcon={false}
				allowDeselect={false}
				defaultValue={slug.sortBy}
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
				defaultValue={slug.limit}
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
