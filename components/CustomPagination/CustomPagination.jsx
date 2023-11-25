'use client'
import { calculateTotalPages } from '@/utils/functions'
import { Flex, Pagination } from '@mantine/core'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'

const CustomPagination = ({ slug, count }) => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const totalPages = calculateTotalPages(count, slug.limit)

	const params = new URLSearchParams(searchParams)

	const handlePage = page => {
		if (page) {
			params.set('page', page)
			replace(`${pathname}?${params}`)
		}
	}
	return (
		<Flex mt={30} justify='center'>
			<Pagination
				total={totalPages}
				onChange={value => handlePage(value)}
				value={parseInt(slug.page)}
			/>
		</Flex>
	)
}
export default CustomPagination
