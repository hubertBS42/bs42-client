'use client'
import {
	Container,
	HoverCard,
	SimpleGrid,
	Title,
} from '@mantine/core'
import CategoryMegaMenuCard from '../CategoryMegaMenuCard/CategoryMegaMenuCard'
import classes from './CategoryMegaMenu.module.scss'
import Link from 'next/link'

const CategoryMegaMenu = ({ category }) => {
	return (
		<HoverCard
			width='100%'
			shadow='xs'
			offset={0}
			transitionProps={{ duration: 500 }}
		>
			<HoverCard.Target>
				<Title order={2} className={classes.categoryLabel}>
					<Link href={`/products?category=${category.slug}`}>
						{category.name}
					</Link>
				</Title>
			</HoverCard.Target>
			<HoverCard.Dropdown>
				<Container size='xl'>
					<SimpleGrid
						cols={4}
						breakpoints={[{ maxWidth: 'md', cols: 3, spacing: 'md' }]}
					>
						{category.children.map(category => (
							<CategoryMegaMenuCard key={category.id} category={category} />
						))}
					</SimpleGrid>
				</Container>
			</HoverCard.Dropdown>
		</HoverCard>
	)
}
export default CategoryMegaMenu
