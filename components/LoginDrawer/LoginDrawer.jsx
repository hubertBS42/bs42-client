'use client'
import { rajdhani } from '@/utils/font'
import {
	ActionIcon,
	Anchor,
	Button,
	Drawer,
	PasswordInput,
	Stack,
	TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLock } from '@tabler/icons-react'
import Link from 'next/link'

const LoginDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false)
	return (
		<>
			<ActionIcon variant='transparent' color='dark' onClick={open}>
				<IconLock size='1.4em' stroke={1.2} />
			</ActionIcon>
			<Drawer
				opened={opened}
				onClose={close}
				position='right'
				overlayProps={{ opacity: 0.5, blur: 3 }}
				title='Customer Login'
			>
				<form>
					<Stack spacing='md'>
						<TextInput label='Email' size='md' type='email' />
						<PasswordInput label='Password' size='md' />
						<Button
							size='md'
							variant='outline'
							ff={rajdhani.style.fontFamily}
							color='gray.4'
							style={theme => ({
								boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
								color: theme.colors.gray[8],
								fontWeight: 700,
								transition: 'ease-in-out .3s all',
							})}
						>
							LOGIN
						</Button>
						<Anchor
							href='/'
							component={Link}
							style={theme => ({
								textAlign: 'center',
								fontSize: 13,
								fontWeight: 400,
								color: theme.colors.blue[9],
							})}
						>
							Forgot your password?
						</Anchor>
						<Button
							size='md'
							variant='filled'
							ff={rajdhani.style.fontFamily}
							color='gray.7'
							style={theme => ({
								boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
								fontWeight: 700,
								transition: 'ease-in-out .3s all',
							})}
							component={Link}
							href='/create-account'
							onClick={close}
						>
							SIGN UP
						</Button>
					</Stack>
				</form>
			</Drawer>
		</>
	)
}
export default LoginDrawer
