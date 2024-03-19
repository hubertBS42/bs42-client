'use client'
import { Box, Container, Group } from '@mantine/core'
import CategoryMegaMenu from '../CategoryMegaMenu/CategoryMegaMenu'
import useSWR from 'swr'
import { fetcher, groupCategories } from '@/utils/functions'

const CategoryMenu = () => {
	const { data, error, isLoading } = useSWR(
		'https://portal.bs42.net/api/frontend/categories',
		fetcher
	)

	let categories = []

	if (!isLoading && !error) {
		categories = groupCategories(data.categories)
	}

	return (
		<Box
			style={theme => ({
				borderBottom: `1px solid ${theme.colors.gray[2]}`,
				backgroundColor: 'white',
			})}
			visibleFrom='sm'
		>
			<Container size='xl'>
				<Group justify='center'>
					{categories.map(category => (
						<CategoryMegaMenu key={category.id} category={category} />
					))}
				</Group>
			</Container>
		</Box>
	)
}
export default CategoryMenu
