'use client'

import { Box, Breadcrumbs, Container, Title } from '@mantine/core'
import classes from './CustomBreadcrumbs.module.scss'
import {
	findCategoryBySlugWithAncestors,
	formatCategoriesForHeader,
} from '@/utils/functions'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'

const CustomBreadcrumbs = ({ categories }) => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)

	const category = params.get('category')

	const formattedCategories = formatCategoriesForHeader(categories)
	const categoryWithAncestors = findCategoryBySlugWithAncestors(
		formattedCategories,
		category
	)

	const data = categoryWithAncestors.map(category => {
		return {
			title: category.name,
			slug: category.slug,
		}
	})

	data.unshift({ title: 'All', slug: '' })

	const handleClick = slug => {
		if (!slug || slug === '') {
			params.delete('category')
			params.set('page', 1)
			replace(`${pathname}?${params}`)
			return
		}
		params.set('category', slug)
		params.set('page', 1)
		replace(`${pathname}?${params}`)
	}

	const items = data.map((item, index) => {
		if (index === data.length - 1) {
			return (
				<span key={index} className={classes.link} active='true'>
					{item.title}
				</span>
			)
		}

		return (
			<span
				key={index}
				className={classes.link}
				onClick={() => handleClick(item.slug)}
			>
				{item.title}
			</span>
		)
	})
	return (
		<Box className={classes.container}>
			<Container size='xl'>
				<Title order={3} c='gray.7'>
					{category ? categoryWithAncestors.pop().name : 'All Products'}
				</Title>
				{category && <Breadcrumbs mt={5}>{items}</Breadcrumbs>}
			</Container>
		</Box>
	)
}
export default CustomBreadcrumbs
