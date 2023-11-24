'use client'
import { Card, NavLink, Title } from '@mantine/core'
import classes from './PriceCard.module.scss'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'

const PriceCard = ({ minPrice, maxPrice }) => {
	const parsedMin = minPrice ? parseInt(minPrice) : null
	const parsedMax = maxPrice ? parseInt(maxPrice) : null
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)

	const handleClick = (min, max) => {
		if (min) {
			params.set('min_price', min)
		} else {
			params.delete('min_price')
		}
		if (max) {
			params.set('max_price', max)
		} else {
			params.delete('max_price')
		}
		replace(`${pathname}?${params}`)
	}

	const prices = [
		{ label: 'Under GHS1000', min: null, max: 1000 },
		{ label: 'GHS1000 - GHS2000', min: 1000, max: 2000 },
		{ label: 'GHS2000 - GHS3000', min: 2000, max: 3000 },
		{ label: 'GHS3000 - GHS4000', min: 3000, max: 4000 },
		{ label: 'Over GHS4000', min: 4000, max: null },
	]

	const renderPrices = prices.map((price, i) => (
		<NavLink
			key={i}
			label={price.label}
			classNames={{
				root: classes.linkRoot,
				label: classes.linkLabel,
			}}
			onClick={() => handleClick(price.min, price.max)}
			active={parsedMin === price.min && parsedMax === price.max}
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
					Shop By Price (GHS)
				</Title>
			</Card.Section>
			<Card.Section withBorder>{renderPrices}</Card.Section>
		</Card>
	)
}
export default PriceCard
