'use client'
import { Flex, Pagination } from '@mantine/core'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'

const CustomPagination = ({ slug, total }) => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

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
				total={total}
				onChange={value => handlePage(value)}
				defaultValue={parseInt(slug.page)}
			/>
		</Flex>
	)
}
export default CustomPagination
