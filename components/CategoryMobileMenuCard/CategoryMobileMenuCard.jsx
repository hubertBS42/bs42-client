import { rajdhani } from '@/utils/font'
import { Card, Stack, Title } from '@mantine/core'
import Link from 'next/link'

import classes from './CategoryMobileMenuCard.module.scss'

const CategoryMobileMenuCard = ({ category }) => {
	return (
		<Card py={0}>
			<Link href='#'>
				<Title
					className={classes.subCategoryLabel}
					ff={rajdhani.style.fontFamily}
				>
					{category.name}
				</Title>
			</Link>

			<Stack spacing={10}>
				{category.children.map(category => (
					<Link className={classes.link} href='#' key={category.id}>
						{category.name}
					</Link>
				))}
			</Stack>
		</Card>
	)
}

export default CategoryMobileMenuCard
