'use client'
import {
	Box,
	Button,
	Card,
	Group,
	NavLink,
	Radio,
	Text,
	Title,
} from '@mantine/core'
import classes from './PriceCard.module.scss'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
import { useState } from 'react'

const PriceCard = ({ minPrice, maxPrice }) => {
	const parsedMin = minPrice ? parseInt(minPrice) : null
	const parsedMax = maxPrice ? parseInt(maxPrice) : null
	const [currentRange, setCurrentRange] = useState(
		JSON.stringify({ min: parsedMin, max: parsedMax })
	)
	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const pathname = usePathname()

	const params = new URLSearchParams(searchParams)

	const handleChange = value => {
		const { min, max } = JSON.parse(value)

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
		params.set('page', 1)
		replace(`${pathname}?${params}`)
		setCurrentRange(JSON.stringify({ min, max }))
	}

	const handleClear = () => {
		params.delete('max_price')
		params.delete('min_price')
		params.set('page', 1)
		replace(`${pathname}?${params}`)
		setCurrentRange(null)
	}

	const prices = [
		{ label: 'Under GHS1000', min: null, max: 1000 },
		{ label: 'GHS1000 - GHS2000', min: 1000, max: 2000 },
		{ label: 'GHS2000 - GHS3000', min: 2000, max: 3000 },
		{ label: 'GHS3000 - GHS4000', min: 3000, max: 4000 },
		{ label: 'Over GHS4000', min: 4000, max: null },
	]

	const renderPrices = prices.map((price, i) => (
		<Radio
			key={i}
			value={JSON.stringify({ min: price.min, max: price.max })}
			label={price.label}
			size='xs'
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
			<Card.Section withBorder py='lg'>
				<Radio.Group
					name='pricesFilter'
					onChange={value => handleChange(value)}
					value={currentRange}
				>
					<Group>{renderPrices}</Group>
				</Radio.Group>
				<Button
					tt='uppercase'
					color='gray'
					fz={11}
					p={0}
					mt='md'
					variant='transparent'
					onClick={handleClear}
				>
					Clear
				</Button>
			</Card.Section>
		</Card>
	)
}
export default PriceCard
