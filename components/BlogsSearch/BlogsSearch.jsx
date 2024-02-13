'use client'
import { TextInput } from '@mantine/core'
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

	return (
		<TextInput
			radius='sm'
			size='sm'
			label='Search'
			onChange={handleSearch}
		/>
	)
}
export default BlogsSearch
