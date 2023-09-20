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
				<Stack spacing='.5em'>
					<NavLink
						label='Home'
						icon={<IconHome size='1.1em' stroke={1.5} />}
						component={Link}
						href='/'
					/>

					<CategoriesDrawer />

					<NavLink
						label='Shop'
						icon={<IconBuildingStore size='1.1em' stroke={1.5} />}
						component={Link}
						href='#'
					/>

					<NavLink
						label='Voip'
						icon={<IconPhoneCall size='1.1em' stroke={1.5} />}
						component={Link}
						href='#'
					/>

					<NavLink
						label='Academy'
						icon={<IconSchool size='1.1em' stroke={1.5} />}
						component={Link}
						href='/'
					/>

					<NavLink
						label='Contact us'
						icon={<IconSend size='1.1em' stroke={1.5} />}
						component={Link}
						href='/'
					/>

					<NavLink
						label='Blog'
						icon={<IconArticle size='1.1em' stroke={1.5} />}
						component={Link}
						href='/'
					/>
				</Stack>
			</Drawer>
		</Group>
	)
}
export default MobileNavDrawer
