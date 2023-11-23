'use client'
import { Card, NavLink, Title } from '@mantine/core'
import classes from './BrandsCard.module.scss'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'

const BrandsCard = ({ brands, slug }) => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)

	const handleClick = newSlug => {
		if (slug === newSlug) return
		params.set('brand', newSlug)
		replace(`${pathname}?${params}`)
	}

	const renderBrands = brands.map(brand => (
		<NavLink
			key={brand._id}
			label={brand.name}
			classNames={{
				root: classes.linkRoot,
				label: classes.linkLabel,
			}}
			active={brand.slug === slug}
			onClick={() => handleClick(brand.slug)}
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
