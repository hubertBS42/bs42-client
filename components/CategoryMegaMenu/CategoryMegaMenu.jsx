'use client'
import {
	Container,
	HoverCard,
	SimpleGrid,
	Title,
} from '@mantine/core'
import CategoryMegaMenuCard from '../CategoryMegaMenuCard/CategoryMegaMenuCard'
import classes from './CategoryMegaMenu.module.scss'
import { useState } from 'react'

const CategoryMegaMenu = ({ category }) => {
	const [opened, setOpened] = useState(false)

	return (
		<HoverCard
			width='100%'
			shadow='xs'
			offset={0}
			onOpen={() => setOpened(true)}
			onClose={() => setOpened(false)}
			transitionProps={{ duration: 500 }}
		>
			<HoverCard.Target>
				<Title order={2} className={classes.categoryLabel}>
					{category.name}
				</Title>
			</HoverCard.Target>
			<HoverCard.Dropdown>
				<Container size='xl'>
					<SimpleGrid
						cols={4}
						breakpoints={[{ maxWidth: 'md', cols: 3, spacing: 'md' }]}
					>
						{category.children.map(category => (
							<CategoryMegaMenuCard
								key={category.id}
								opened={opened}
								category={category}
							/>
						))}
					</SimpleGrid>
				</Container>
			</HoverCard.Dropdown>
		</HoverCard>
	)
}
export default CategoryMegaMenu
