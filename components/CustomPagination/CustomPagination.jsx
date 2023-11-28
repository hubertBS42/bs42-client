'use client'
import { calculateTotalPages } from '@/utils/functions'
import { Flex, Pagination } from '@mantine/core'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'

const CustomPagination = ({ count }) => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)

	const limit = params.get('limit') || '25'
	const page = params.get('page') || '1'

	const totalPages = calculateTotalPages(count, parseInt(limit))

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
				value={parseInt(page)}
			/>
		</Flex>
	)
}
export default CustomPagination
