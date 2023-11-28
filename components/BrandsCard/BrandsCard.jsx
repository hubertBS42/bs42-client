'use client'
import { Box, Card, Checkbox, Stack, Title } from '@mantine/core'
import classes from './BrandsCard.module.scss'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'

const BrandsCard = ({ brands }) => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)

	const brand = params.get('brand')
	const selectedBrands = brand?.split(',') || []

	const handleChange = values => {
		if (values.length < 1) {
			params.delete('brand')
			replace(`${pathname}?${params}`)
			return
		}

		params.set('brand', values)
		params.set('page', 1)
		replace(`${pathname}?${params}`)
	}

	const handleClear = () => {
		params.delete('brand')
		params.set('page', 1)
		replace(`${pathname}?${params}`)
	}

	const renderBrands = brands.map(brand => (
		<Checkbox
			size='xs'
			key={brand._id}
			value={brand.slug}
			label={brand.name}
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
			<Card.Section withBorder pt='lg' pb='md'>
				<Checkbox.Group
					onChange={values => handleChange(values)}
					value={selectedBrands}
				>
					<Stack>{renderBrands}</Stack>
				</Checkbox.Group>
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
export default BrandsCard
