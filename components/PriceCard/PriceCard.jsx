'use client'
import { Card, NavLink, Title } from '@mantine/core'
import classes from './PriceCard.module.scss'

const PriceCard = () => {
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
					Shop By Price
				</Title>
			</Card.Section>
			<Card.Section withBorder>
				<NavLink
					label='GHS0.00 - GHS1000.00'
					classNames={{
						root: classes.linkRoot,
						label: classes.linkLabel,
					}}
				/>
				<NavLink
					label='GHS1000.00 - GHS2000.00'
					classNames={{
						root: classes.linkRoot,
						label: classes.linkLabel,
					}}
				/>
				<NavLink
					label='GHS2000.00 - GHS3000.00'
					classNames={{
						root: classes.linkRoot,
						label: classes.linkLabel,
					}}
				/>
				<NavLink
					label='GHS3000.00 - GHS4000.00'
					classNames={{
						root: classes.linkRoot,
						label: classes.linkLabel,
					}}
				/>
				<NavLink
					label='GHS4000.00 - GHS5000.00'
					classNames={{
						root: classes.linkRoot,
						label: classes.linkLabel,
					}}
				/>
			</Card.Section>
		</Card>
	)
}
export default PriceCard
