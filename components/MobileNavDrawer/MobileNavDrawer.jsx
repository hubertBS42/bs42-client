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
import React from 'react'

const MobileNavDrawer = () => {
	const [opened, { toggle: toggleMobNav }] = useDisclosure(false)
	const label = opened ? 'Close navigation' : 'Open navigation'

	const linksData = [
		{
			label: 'Home',
			href: '/',
			icon: <IconHome size='1.1em' stroke={1.5} />,
		},
		{
			label: 'Shop',
			href: '/products',
			icon: <IconBuildingStore size='1.1em' stroke={1.5} />,
		},
		{
			label: 'VoIP',
			href: '/voip',
			icon: <IconPhoneCall size='1.1em' stroke={1.5} />,
		},
		{
			label: 'Academy',
			href: '/academy',
			icon: <IconSchool size='1.1em' stroke={1.5} />,
		},
		{
			label: 'Contact Us',
			href: '/contact-us',
			icon: <IconSend size='1.1em' stroke={1.5} />,
		},
		{
			label: 'Blogs',
			href: '/blogs',
			icon: <IconArticle size='1.1em' stroke={1.5} />,
		},
	]

	const renderLinks = linksData.map((link, i) => (
		<React.Fragment key={i}>
			{i === 1 && <CategoriesDrawer toggleMobNav={toggleMobNav} />}
			<NavLink
				label={link.label}
				leftSection={link.icon}
				component={Link}
				href={link.href}
				classNames={{
					label: classes.label,
					root: classes.root,
				}}
			/>
		</React.Fragment>
	))
	return (
		<Group hiddenFrom='sm'>
			<Burger
				opened={opened}
				onClick={toggleMobNav}
				aria-label={label}
				size='sm'
			/>
			<Drawer
				opened={opened}
				onClose={toggleMobNav}
				title='Menu'
				style={{ fontFamily: rajdhani.style.fontFamily }}
				overlayProps={{ opacity: 0.5, blur: 4 }}
			>
				<Stack gap={0.8}>{renderLinks}</Stack>
			</Drawer>
		</Group>
	)
}
export default MobileNavDrawer
