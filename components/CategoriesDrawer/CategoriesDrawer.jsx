'use client'

import { rajdhani } from '@/utils/font'
import {
	Accordion,
	Drawer,
	NavLink,
	Stack,
	Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconCategory, IconChevronRight } from '@tabler/icons-react'
import CategoryMobileMenuCard from '../CategoryMobileMenuCard/CategoryMobileMenuCard'
import { formatCategoriesForHeader } from '@/utils/functions'
import { useSelector } from 'react-redux'
import { selectAllCategories } from '@/redux/features/categories/categoriesSlice'
import classes from './CategoriesDrawer.module.scss'
import Link from 'next/link'

const CategoriesDrawer = ({ toggleMobNav }) => {
	const [opened, { toggle }] = useDisclosure(false)
	const categories = formatCategoriesForHeader(
		useSelector(selectAllCategories)
	)

	const handleNavClick = () => {
		toggle()
		toggleMobNav()
	}
	return (
		<>
			<NavLink
				label='Categories'
				leftSection={<IconCategory size='1.1em' stroke={1.5} />}
				rightSection={<IconChevronRight size='1.1em' stroke={1.5} />}
				classNames={{
					label: classes.label,
					root: classes.root,
				}}
				onClick={toggle}
			/>
			<Drawer.Root opened={opened} onClose={toggle}>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title ff={rajdhani.style.fontFamily}>
							Categories
						</Drawer.Title>
						<Drawer.CloseButton></Drawer.CloseButton>
					</Drawer.Header>
					<Drawer.Body>
						{categories.map(category => (
							<NavLink
								key={category.id}
								label={category.name}
								classNames={{
									label: classes.label,
									root: classes.root,
								}}
								component={Link}
								href={`/products?category=${category.slug}`}
								onClick={handleNavClick}
							/>
						))}
					</Drawer.Body>
				</Drawer.Content>
			</Drawer.Root>
		</>
	)
}
export default CategoriesDrawer
