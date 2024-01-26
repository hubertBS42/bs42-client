'use client'
import { Box, Card, Pill, Title } from '@mantine/core'
import classes from './FiltersCard.module.scss'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'

const FiltersCard = ({ categories, brands, prices }) => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)

	const category = params.get('category')
	const brand = params.get('brand')
	const condition = params.get('condition')
	const minPrice = params.get('min_price')
	const maxPrice = params.get('max_price')

	const conditions = [
		{ title: 'New', value: 'new' },
		{ title: 'Used', value: 'used' },
	]

	const filters = []

	if (category) {
		const data = categories.find(item => item.slug === category)
		filters.push({
			type: 'category',
			title: data.name,
			value: data.slug,
		})
	}

	if (brand) {
		const extracted = brand.split(',')
		extracted.map(item => {
			const result = brands.find(brand => brand.slug === item)
			filters.push({
				type: 'brand',
				title: result.name,
				value: result.slug,
			})
		})
	}

	if (minPrice || maxPrice) {
		const parsedMin = minPrice ? parseInt(minPrice) : null
		const parsedMax = maxPrice ? parseInt(maxPrice) : null

		const selectedPrice = prices.find(
			price => price.min === parsedMin && price.max === parsedMax
		)

		filters.push({
			type: 'price',
			title: selectedPrice.label,
			value: {
				min_price: selectedPrice.min,
				max_price: selectedPrice.max,
			},
		})
	}

	if (condition) {
		const data = conditions.find(item => item.value === condition)
		filters.push({
			type: 'condition',
			title: data.title,
			value: data.value,
		})
	}

	const handleClear = () => {
		const keys = []
		for (const key of params.keys()) {
			keys.push(key)
		}

		keys.forEach(key => params.delete(key))
		params.set('page', 1)
		replace(`${pathname}?${params}`)
	}

	const handleRemove = (type, value) => {
		if (type === 'price') {
			params.delete('max_price')
			params.delete('min_price')
			params.set('page', 1)
			replace(`${pathname}?${params}`)
			return
		}

		if (type === 'brand') {
			const brands = filters.filter(filter => filter.type === type)
			const filtered = brands
				.filter(brand => brand.value !== value)
				.map(brand => brand.value)

			if (filtered.length < 1) {
				params.delete(type)
				params.set('page', 1)
				replace(`${pathname}?${params}`)
				return
			}

			params.set('brand', filtered)
			params.set('page', 1)
			replace(`${pathname}?${params}`)
			return
		}

		params.delete(type)
		params.set('page', 1)
		replace(`${pathname}?${params}`)
	}

	const pills = filters.map((filter, i) => (
		<Pill
			key={i}
			withRemoveButton
			onRemove={() => handleRemove(filter.type, filter.value)}
		>
			{filter.title}
		</Pill>
	))

	if (filters.length < 1) {
		return <></>
	}

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
					Filters
				</Title>
			</Card.Section>
			<Card.Section withBorder pt='lg' pb='md'>
				<Pill.Group>{pills}</Pill.Group>
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
export default FiltersCard
