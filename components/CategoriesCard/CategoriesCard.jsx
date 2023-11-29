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
import { IconArrowNarrowLeft } from '@tabler/icons-react'

const CategoriesCard = ({ categories }) => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)

	const category = params.get('category')

	let displayCategories = null
	const formattedCategories = formatCategoriesForHeader(categories)

	if (category) {
		const ancestor = findCategoryBySlugWithAncestors(
			formattedCategories,
			category
		)[0]
		displayCategories = [ancestor]
	} else {
		displayCategories = formattedCategories
	}

	const handleClick = newCategory => {
		if (newCategory !== '') {
			if (newCategory === category) return
			params.set('category', newCategory)
			params.set('page', 1)
		} else {
			params.delete('category')
		}

		replace(`${pathname}?${params}`)
	}

	const renderCategories = data => {
		return data.map(item => (
			<NavLink
				key={item.id}
				label={item.name}
				childrenOffset={10}
				classNames={{
					root: classes.linkRoot,
					label: classes.linkLabel,
				}}
				active={item.slug === category}
				opened
				onClick={() => handleClick(item.slug)}
			>
				{category &&
					item.children &&
					item.children.length > 0 &&
					renderCategories(item.children)}
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
				{category && (
					<NavLink
						label='All Categories'
						leftSection={<IconArrowNarrowLeft size='1rem' stroke={1.5} />}
						classNames={{
							root: classes.linkRoot,
							label: classes.linkLabel,
						}}
						onClick={() => handleClick('')}
					/>
				)}
			</Card.Section>
		</Card>
	)
}
export default CategoriesCard
