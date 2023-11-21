'use client'

import { Burger, Drawer, Group, NavLink, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
	IconArticle,
	IconBuildingStore,
	IconHome,
	IconPhoneCall,
	IconSchool,
	IconSend,
} from '@tabler/icons-react'
import Link from 'next/link'
import CategoriesDrawer from '../CategoriesDrawer/CategoriesDrawer'
import { rajdhani } from '@/utils/font'
import classes from './MobileNavDrawer.module.scss'

const MobileNavDrawer = () => {
	const [opened, { toggle }] = useDisclosure(false)
	const label = opened ? 'Close navigation' : 'Open navigation'
	return (
		<Group hiddenFrom='sm'>
			<Burger
				opened={opened}
				onClick={toggle}
				aria-label={label}
				size='sm'
			/>
			<Drawer
				opened={opened}
				onClose={toggle}
				title='Menu'
				style={{ fontFamily: rajdhani.style.fontFamily }}
				overlayProps={{ opacity: 0.5, blur: 4 }}
			>
				<Stack gap={0.8}>
					<NavLink
						label='Home'
						leftSection={<IconHome size='1.1em' stroke={1.5} />}
						component={Link}
						href='/'
						classNames={{
							label: classes.navLinkLabel,
						}}
					/>

					<CategoriesDrawer />

					<NavLink
						label='Shop'
						leftSection={<IconBuildingStore size='1.1em' stroke={1.5} />}
						component={Link}
						href='#'
						classNames={{
							label: classes.navLinkLabel,
						}}
					/>

					<NavLink
						label='Voip'
						leftSection={<IconPhoneCall size='1.1em' stroke={1.5} />}
						component={Link}
						href='#'
						classNames={{
							label: classes.navLinkLabel,
						}}
					/>

					<NavLink
						label='Academy'
						leftSection={<IconSchool size='1.1em' stroke={1.5} />}
						component={Link}
						href='/'
						classNames={{
							label: classes.navLinkLabel,
						}}
					/>

					<NavLink
						label='Contact us'
						leftSection={<IconSend size='1.1em' stroke={1.5} />}
						component={Link}
						href='/'
						classNames={{
							label: classes.navLinkLabel,
						}}
					/>

					<NavLink
						label='Blog'
						leftSection={<IconArticle size='1.1em' stroke={1.5} />}
						component={Link}
						href='/'
						classNames={{
							label: classes.navLinkLabel,
						}}
					/>
				</Stack>
			</Drawer>
		</Group>
	)
}
export default MobileNavDrawer
