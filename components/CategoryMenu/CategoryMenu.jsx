import { Box, Container, Group } from '@mantine/core'
import CategoryMegaMenu from '../CategoryMegaMenu/CategoryMegaMenu'
import { getAllCategories } from '@/server/actions'
import { useEffect, useState } from 'react'

const CategoryMenu = () => {
	const [categories, setCategories] = useState([])

	useEffect(() => {
		const getCategories = async () => {
			try {
				const data = await getAllCategories('group')
				setCategories(data)
			} catch (error) {
				console.log(error.message)
			}
		}
		getCategories()
	}, [])

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
