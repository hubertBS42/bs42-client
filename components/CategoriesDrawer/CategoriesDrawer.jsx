'use client'

import { rajdhani } from '@/utils/font'
import {
	Accordion,
	Drawer,
	NavLink,
	Stack,
	Text,
	createStyles,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
	IconArrowNarrowLeft,
	IconCategory,
	IconChevronRight,
} from '@tabler/icons-react'
import CategoryMobileMenuCard from '../CategoryMobileMenuCard/CategoryMobileMenuCard'
import { formatCategoriesForHeader } from '@/utils/functions'
import { useSelector } from 'react-redux'
import { selectAllCategories } from '@/redux/features/categories/categoriesSlice'
import classes from './CategoriesDrawer.module.scss'

const CategoriesDrawer = () => {
	const [opened, { toggle }] = useDisclosure(false)
	const categories = formatCategoriesForHeader(
		useSelector(selectAllCategories)
	)
	return (
		<Stack>
			<NavLink
				label='Categories'
				icon={<IconCategory size='1.1em' stroke={1.5} />}
				rightSection={<IconChevronRight size='1.1em' stroke={1.5} />}
				onClick={toggle}
			/>
			<Drawer.Root opened={opened} onClose={toggle}>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title ff={rajdhani.style.fontFamily}>
							Categories
						</Drawer.Title>
						<Drawer.CloseButton>
							<IconArrowNarrowLeft />
						</Drawer.CloseButton>
					</Drawer.Header>
					<Drawer.Body>
						<Accordion>
							{categories.map(category => (
								<Accordion.Item key={category.id} value={category.name}>
									<Accordion.Control>
										<Text className={classes.accordionTitle}>
											{category.name}
										</Text>
									</Accordion.Control>
									<Accordion.Panel className={classes.accordionBody}>
										<Stack spacing='1.5em'>
											{category.children.map(category => (
												<CategoryMobileMenuCard
													category={category}
													key={category.id}
												/>
											))}
										</Stack>
									</Accordion.Panel>
								</Accordion.Item>
							))}
						</Accordion>
					</Drawer.Body>
				</Drawer.Content>
			</Drawer.Root>
		</Stack>
	)
}
export default CategoriesDrawer
