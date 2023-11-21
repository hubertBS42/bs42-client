'use client'
import { Card, NavLink, Title } from '@mantine/core'
import classes from './CategoriesCard.module.scss'
import { formatCategoriesForHeader } from '@/utils/functions'
import Link from 'next/link'

const CategoriesCard = ({ categories }) => {
	const formattedCategories = formatCategoriesForHeader(categories)

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
				// component={Link}
				// href={`/products/${category.slug}`}
			>
				{category.children &&
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
				{renderCategories(formattedCategories)}
			</Card.Section>
		</Card>
	)
}
export default CategoriesCard
