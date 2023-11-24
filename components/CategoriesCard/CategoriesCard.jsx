'use client'
import { Card, NavLink, Title } from '@mantine/core'
import classes from './CategoriesCard.module.scss'
import {
	findCategoryBySlugWithAncestors,
	formatCategoriesForHeader,
} from '@/utils/functions'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'

const CategoriesCard = ({ categories, slug }) => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)

	let displayCategories = null
	const formattedCategories = formatCategoriesForHeader(categories)

	if (slug) {
		const ancestor = findCategoryBySlugWithAncestors(
			formattedCategories,
			slug
		)[0]
		displayCategories = [ancestor]
	} else {
		displayCategories = formattedCategories
	}

	const handleClick = newSlug => {
		if (slug === newSlug) return
		params.set('category', newSlug)
		replace(`${pathname}?${params}`)
	}

	const renderCategories = data => {
		return data.map(category => (
			<NavLink
				key={category.id}
				label={category.name}
				childrenOffset={10}
				classNames={{
					root: classes.linkRoot,
					label: classes.linkLabel,
				}}
				active={category.slug === slug}
				opened
				onClick={() => handleClick(category.slug)}
			>
				{slug &&
					category.children &&
					category.children.length > 0 &&
					renderCategories(category.children)}
			</NavLink>
		))
	}

	return (
		<Card
			withBorder
			radius='sm'
			classNames={{
				section: classes.cardSection,
			}}
		>
			<Card.Section withBorder>
				<Title order={5} c='gray.7' tt='uppercase'>
					Categories
				</Title>
			</Card.Section>
			<Card.Section withBorder>
				{renderCategories(displayCategories)}
			</Card.Section>
		</Card>
	)
}
export default CategoriesCard
