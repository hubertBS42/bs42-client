'use client'
import { getInitials } from '@/utils/functions'
import { Avatar, Menu, Text } from '@mantine/core'
import {
	IconArrowsLeftRight,
	IconSearch,
	IconTrash,
} from '@tabler/icons-react'
import { IconPhoto } from '@tabler/icons-react'
import { IconMessageCircle, IconSettings } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'

const CustomAvatar = ({ user }) => {
	const initials = getInitials(user.firstName, user.lastName)
	return (
		<Menu shadow='md' width={200}>
			<Menu.Target>
				<Avatar
					src={null}
					alt={`${user.firstName} ${user.lastName}`}
					color='blue'
					style={{ cursor: 'pointer' }}
				>
					<Text size='sm'>{initials}</Text>
				</Avatar>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item leftSection={<IconSettings />}>Settings</Menu.Item>
				<Menu.Item leftSection={<IconMessageCircle />}>
					Messages
				</Menu.Item>
				<Menu.Item leftSection={<IconPhoto />}>Order History</Menu.Item>

				<Menu.Divider />

				<Menu.Item
					color='red'
					leftSection={<IconTrash />}
					onClick={signOut}
				>
					Logout
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	)
}
export default CustomAvatar
