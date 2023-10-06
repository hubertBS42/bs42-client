'use client'
import { getInitials } from '@/utils/functions'
import { Avatar, Menu, Text } from '@mantine/core'
import { IconHistory, IconLogout } from '@tabler/icons-react'
import { IconMessageCircle, IconSettings } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'

const CustomAvatar = ({ user }) => {
	const initials = getInitials(user.firstName, user.lastName)
	return (
		<Menu shadow='md' width={200}>
			<Menu.Target>
				<Avatar
					src={user.profileImg}
					alt={`${user.firstName} ${user.lastName}`}
					color='blue'
					style={{ cursor: 'pointer' }}
				>
					<Text size='sm'>{initials}</Text>
				</Avatar>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item
					leftSection={<IconSettings size='1.4em' stroke={1.2} />}
				>
					Settings
				</Menu.Item>
				<Menu.Item
					leftSection={<IconMessageCircle size='1.4em' stroke={1.2} />}
				>
					Messages
				</Menu.Item>
				<Menu.Item
					leftSection={<IconHistory size='1.4em' stroke={1.2} />}
				>
					Order History
				</Menu.Item>

				<Menu.Divider />

				<Menu.Item
					color='red'
					leftSection={<IconLogout size='1.4em' stroke={1.2} />}
					onClick={signOut}
				>
					Logout
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	)
}
export default CustomAvatar
