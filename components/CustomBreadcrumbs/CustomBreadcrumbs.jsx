'use client'

import { Box, Breadcrumbs, Container, Title } from '@mantine/core'
import Link from 'next/link'
import classes from './CustomBreadcrumbs.module.scss'
import {
	findCategoryBySlugWithAncestors,
	formatCategoriesForHeader,
} from '@/utils/functions'

const CustomBreadcrumbs = ({ categories, slug }) => {
	const formattedCategories = formatCategoriesForHeader(categories)
	const categoryWithAncestors = findCategoryBySlugWithAncestors(
		formattedCategories,
		slug
	)

	const data = categoryWithAncestors.map(category => {
		return {
			title: category.name,
			href: `/products?category=${category.slug}`,
		}
	})

	data.unshift({ title: 'All', href: '/products' })

	const items = data.map((item, index) => {
		if (index === data.length - 1) {
			return (
				<Link
					href={item.href}
					key={index}
					className={classes.link}
					active='true'
				>
					{item.title}
				</Link>
			)
		}

		return (
			<Link href={item.href} key={index} className={classes.link}>
				{item.title}
			</Link>
		)
	})
	return (
		<Box className={classes.container}>
			<Container size='xl'>
				<Title order={3} c='gray.7'>
					{slug ? categoryWithAncestors.pop().name : 'All Products'}
				</Title>
				{slug && <Breadcrumbs mt={5}>{items}</Breadcrumbs>}
			</Container>
		</Box>
	)
}
export default CustomBreadcrumbs
