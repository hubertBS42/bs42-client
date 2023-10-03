import { Box, Container, Group } from '@mantine/core'
import CategoryMegaMenu from '../CategoryMegaMenu/CategoryMegaMenu'
import { formatCategoriesForHeader } from '@/utils/functions'
import { useSelector } from 'react-redux'
import { selectAllCategories } from '@/redux/features/categories/categoriesSlice'

const CategoryMenu = () => {
	const categories = formatCategoriesForHeader(
		useSelector(selectAllCategories)
	)
	return (
		<Box
			style={theme => ({
				border: `1px solid ${theme.colors.gray[2]}`,
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
