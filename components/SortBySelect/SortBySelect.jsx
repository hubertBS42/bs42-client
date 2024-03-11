'use client'

import { Select } from '@mantine/core'
import classes from './SortBySelect.module.scss'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'

const SortBySelect = () => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)
	const sortBy = params.get('sort_by') || 'newest'

	const sortByData = [
		{ value: 'newest', label: 'Newest' },
		{ value: 'oldest', label: 'Oldest' },
		{ value: 'featured', label: 'Featured' },
		{ value: 'a-z', label: 'A - Z' },
		{ value: 'z-a', label: 'Z - A' },
		{ value: 'priceLow', label: 'Price: Lowest' },
		{ value: 'priceHigh', label: 'Price: Highest' },
	]

	const handleSort = sortParam => {
		if (sortParam) {
			params.set('sort_by', sortParam)
			params.set('page', 1)
			replace(`${pathname}?${params}`)
		}
	}

	return (
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
	)
}
export default SortBySelect
