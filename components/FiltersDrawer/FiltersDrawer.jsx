'use client'
import { ActionIcon, Drawer, Flex, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './FiltersDrawer.module.scss'
import { IconAdjustments } from '@tabler/icons-react'
import CategoriesCard from '../CategoriesCard/CategoriesCard'
import PriceCard from '../PriceCard/PriceCard'
import BrandsCard from '../BrandsCard/BrandsCard'
import LimitSelect from '../LimitSelect/LimitSelect'
import SortBySelect from '../SortBySelect/SortBySelect'

const FiltersDrawer = ({ brands, categories }) => {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<ActionIcon
				variant='transparent'
				aria-label='Filters'
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
					<Flex gap='sm'>
						<LimitSelect />
						<SortBySelect />
					</Flex>
					<CategoriesCard categories={categories} />
					<PriceCard />
					<BrandsCard brands={brands} />
				</Stack>
			</Drawer>
		</>
	)
}
export default FiltersDrawer
