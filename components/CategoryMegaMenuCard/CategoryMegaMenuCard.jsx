'use client'

import { Card, Stack, Title } from '@mantine/core'
import Link from 'next/link'
import classes from './CategoryMegaMenuCard.module.scss'

const CategoryMegaMenuCard = ({ category }) => {
	return (
		<Card>
			<Link href='#'>
				<Title className={classes.subCategoryLabel}>
					{category.name}
				</Title>
			</Link>

			<Stack gap={10}>
				{category.children.map(category => (
					<Link key={category.id} className={classes.link} href='#'>
						{category.name}
					</Link>
				))}
			</Stack>
		</Card>
	)
}

export default CategoryMegaMenuCard
