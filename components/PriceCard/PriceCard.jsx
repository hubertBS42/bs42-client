'use client'
import { Box, Card, Group, Radio, Stack, Title } from '@mantine/core'
import classes from './PriceCard.module.scss'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'

const PriceCard = ({ prices }) => {
	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const pathname = usePathname()

	const params = new URLSearchParams(searchParams)

	const minPrice = params.get('min_price')
	const maxPrice = params.get('max_price')

	const parsedMin = minPrice ? parseInt(minPrice) : null
	const parsedMax = maxPrice ? parseInt(maxPrice) : null

	const currentRange = JSON.stringify({
		min: parsedMin,
		max: parsedMax,
	})

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
	}

	const handleClear = () => {
		params.delete('max_price')
		params.delete('min_price')
		params.set('page', 1)
		replace(`${pathname}?${params}`)
	}

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
					Shop By Price
				</Title>
			</Card.Section>
			<Card.Section withBorder pt='lg' pb='md'>
				<Radio.Group
					name='pricesFilter'
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
