'use client'

import {
	Box,
	Breadcrumbs,
	Container,
	Flex,
	Title,
} from '@mantine/core'
import classes from './CustomBreadcrumbs.module.scss'
import {
	findCategoryBySlugWithAncestors,
	formatCategoriesForHeader,
	getBrands,
	getCategories,
	groupCategories,
} from '@/utils/functions'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
import FiltersDrawer from '../FiltersDrawer/FiltersDrawer'
import { useEffect, useState } from 'react'

const CustomBreadcrumbs = ({ categories, brands }) => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	// const [categories, setCategories] = useState([])
	// const [brands, setBrands] = useState([])

	const params = new URLSearchParams(searchParams)
	const category = params.get('category')

	// const fetchBrandsAndCategories = async () => {
	// 	const brandsData = getBrands()
	// 	const categoriesData = getCategories()

	// 	const [brands, categories] = await Promise.all([
	// 		brandsData,
	// 		categoriesData,
	// 	])

	// 	setCategories(categories.data)
	// 	setBrands(brands.data)
	// }

	// useEffect(() => {
	// 	fetchBrandsAndCategories()
	// }, [])

	const formattedCategories = groupCategories(categories)
	const categoryWithAncestors = findCategoryBySlugWithAncestors(
		formattedCategories,
		category
	)

	const title = category
		? [...categoryWithAncestors].pop()?.name
		: 'All Products'

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
				<Flex justify='space-between' align='center'>
					<Box>
						<Title order={3} c='gray.7' visibleFrom='md'>
							{title}
						</Title>
						<Title order={4} c='gray.7' hiddenFrom='md'>
							{title}
						</Title>
						{category && <Breadcrumbs mt={5}>{items}</Breadcrumbs>}
					</Box>
					<FiltersDrawer brands={brands} categories={categories} />
				</Flex>
			</Container>
		</Box>
	)
}
export default CustomBreadcrumbs
