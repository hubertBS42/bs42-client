'use client'
import { Box, Card, Radio, Stack, Title } from '@mantine/core'
import classes from './PriceCard.module.scss'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
import { useState } from 'react'

const PriceCard = () => {
	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const pathname = usePathname()
	const params = new URLSearchParams(searchParams)
	const minPrice = params.get('min_price')
	const maxPrice = params.get('max_price')
	// const parsedMin = minPrice ? Number(minPrice) : null
	// const parsedMax = maxPrice ? Number(maxPrice) : null
	const string = JSON.stringify({
		min: minPrice ? Number(minPrice) : null,
		max: maxPrice ? Number(maxPrice) : null,
	})
	const [currentRange, setCurrentRange] = useState(string)

	const prices = [
		{ id: 1, label: 'Under GHS 1000', min: null, max: 1000 },
		{ id: 2, label: 'GHS 1000 - GHS 2000', min: 1000, max: 2000 },
		{ id: 3, label: 'GHS 2000 - GHS 3000', min: 2000, max: 3000 },
		{ id: 4, label: 'GHS 3000 - GHS 4000', min: 3000, max: 4000 },
		{ id: 5, label: 'Over GHS 4000', min: 4000, max: null },
	]

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
	}

	const renderPrices = prices.map(price => (
		<Radio
			key={price.id}
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
					Shop By Price
				</Title>
			</Card.Section>
			<Card.Section withBorder pt='lg' pb='md'>
				<Radio.Group
					// name='pricesFilter'
					onChange={value => handleChange(value)}
					value={currentRange}
				>
					<Stack>{renderPrices}</Stack>
				</Radio.Group>
				<Box
					tt='uppercase'
					fz={11}
					fw={500}
					c='gray'
					mt='md'
					style={{
						cursor: 'pointer',
					}}
					onClick={handleClear}
				>
					Clear
				</Box>
			</Card.Section>
		</Card>
	)
}
export default PriceCard
