'use client'
import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

const BlogsSearch = () => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)

	const handleSearch = useDebouncedCallback(async e => {
		// if (e.target.value === '') {
		// 	params.delete('q')
		// 	params.set('page', 1)
		// 	replace(`${pathname}?${params}`)
		// 	return
		// }
		if (e.target.value.length > 2) {
			params.set('q', e.target.value)
			params.set('page', 1)
			replace(`${pathname}?${params}`)
		}

		if (e.target.value === '') {
			params.delete('q')
			params.set('page', 1)
			replace(`${pathname}?${params}`)
		}
	}, 300)
	// const handleSearch = useDebouncedCallback(async e => {
	// 	if (e.target.value.length > 2) {
	// 		setIsLoading(true)
	// 		const { data, status } = await fetcher(
	// 			`https://portal.bs42.net/api/frontend/products/search?q=${e.target.value}`,
	// 			{ cache: 'no-store' }
	// 		)

	// 		if (status === 'success') {
	// 			setResults(data)
	// 			setIsLoading(false)
	// 		} else {
	// 			console.log('Could not fetch products')
	// 		}
	// 	} else {
	// 		setResults([])
	// 	}
	// }, 300)

	return (
		<TextInput
			radius='sm'
			size='sm'
			placeholder='Search blogs'
			leftSection={<IconSearch size='1.4em' stroke={1.2} />}
			onChange={handleSearch}
		/>
	)
}
export default BlogsSearch
