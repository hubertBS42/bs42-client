'use client'
import {
	ActionIcon,
	Button,
	Drawer,
	Indicator,
	Stack,
	Text,
	Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './FiltersDrawer.module.scss'
import { IconAdjustments } from '@tabler/icons-react'
import CategoriesCard from '../CategoriesCard/CategoriesCard'
import { getBrands, getCategories } from '@/utils/functions'
import { useEffect, useState } from 'react'
import PriceCard from '../PriceCard/PriceCard'
import BrandsCard from '../BrandsCard/BrandsCard'
import ProductsPageToolbar from '../ProductsPageToolbar/ProductsPageToolbar'

const FiltersDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false)
	const [categories, setCategories] = useState([])
	const [brands, setBrands] = useState([])

	const prices = [
		{ label: 'Under GHS1000', min: null, max: 1000 },
		{ label: 'GHS1000 - GHS2000', min: 1000, max: 2000 },
		{ label: 'GHS2000 - GHS3000', min: 2000, max: 3000 },
		{ label: 'GHS3000 - GHS4000', min: 3000, max: 4000 },
		{ label: 'Over GHS4000', min: 4000, max: null },
	]

	const fetchBrandsAndCategories = async () => {
		const brandsData = getBrands()
		const categoriesData = getCategories()

		const [brands, categories] = await Promise.all([
			brandsData,
			categoriesData,
		])

		setCategories(categories.data)
		setBrands(brands.data)
	}

	useEffect(() => {
		fetchBrandsAndCategories()
	}, [])

	return (
		<>
			<ActionIcon
				variant='transparent'
				aria-label='Settings'
				hiddenFrom='md'
				onClick={open}
			>
				<IconAdjustments size='1.4em' stroke={1.2} />
			</ActionIcon>
			<Drawer
				opened={opened}
				onClose={close}
				position='right'
				overlayProps={{ opacity: 0.5, blur: 3 }}
				title='Filters'
			>
				<Stack>
					<CategoriesCard categories={categories} />
					<PriceCard prices={prices} />
					<BrandsCard brands={brands} />
				</Stack>
			</Drawer>
		</>
	)
}
export default FiltersDrawer
