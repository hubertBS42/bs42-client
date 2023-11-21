'use client'
import { Card, NavLink, Title } from '@mantine/core'
import classes from './BrandsCard.module.scss'

const BrandsCard = ({ brands }) => {
	const renderBrands = brands.map(brand => (
		<NavLink
			key={brand._id}
			label={brand.name}
			classNames={{
				root: classes.linkRoot,
				label: classes.linkLabel,
			}}
		/>
	))
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
					Brands
				</Title>
			</Card.Section>
			<Card.Section withBorder>{renderBrands}</Card.Section>
		</Card>
	)
}
export default BrandsCard
