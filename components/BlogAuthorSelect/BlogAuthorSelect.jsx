import { Select } from '@mantine/core'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'

const BlogAuthorSelect = ({ data }) => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const author = params.get('author')

	const authors = [{ label: 'All', value: 'all' }]

	if (data.blogs.length > 0) {
		const uniqueAuthors = Array.from(
			new Set(data.blogs.map(blog => JSON.stringify(blog.author)))
		).map(author => JSON.parse(author))

		const formatted = uniqueAuthors.map(author => {
			return {
				label: author.lastName
					? author.firstName + ' ' + author.lastName
					: author.firstName,
				value: author._id,
			}
		})

		authors.push(...formatted)
	}

	const handleChange = value => {
		params.set('author', value)
		params.set('page', 1)
		replace(`${pathname}?${params}`)
	}

	return (
		<Select
			label='Author'
			data={authors}
			withCheckIcon={false}
			allowDeselect={false}
			comboboxProps={{ withinPortal: false }}
			defaultValue={author || 'all'}
			onChange={value => handleChange(value)}
		/>
	)
}
export default BlogAuthorSelect
