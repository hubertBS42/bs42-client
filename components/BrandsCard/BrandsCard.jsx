'use client'
import {
	Button,
	Card,
	Checkbox,
	Group,
	NavLink,
	Stack,
	Title,
} from '@mantine/core'
import classes from './BrandsCard.module.scss'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
import { useState } from 'react'

const BrandsCard = ({ brands, slug }) => {
	const [selectedBrands, setSelectedBrands] = useState(
		slug?.split(',') || []
	)
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)

	const handleChange = values => {
		if (values.length < 1) {
			params.delete('brand')
			setSelectedBrands([])
			replace(`${pathname}?${params}`)
			return
		}
		setSelectedBrands(values)
		params.set('brand', values)
		params.set('page', 1)
		replace(`${pathname}?${params}`)
	}

	const handleClear = () => {
		params.delete('brand')
		params.set('page', 1)
		replace(`${pathname}?${params}`)
		setSelectedBrands([])
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
			<Card.Section withBorder py='lg'>
				<Checkbox.Group
					onChange={values => handleChange(values)}
					value={selectedBrands}
				>
					<Stack>{renderBrands}</Stack>
				</Checkbox.Group>
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
export default BrandsCard
