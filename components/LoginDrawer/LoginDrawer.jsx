'use client'
import { loadCart } from '@/redux/features/cart/cartActions'
import { rajdhani } from '@/utils/font'
import { getCartToken } from '@/utils/functions'
import {
	ActionIcon,
	Anchor,
	Button,
	Drawer,
	PasswordInput,
	Stack,
	TextInput,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconLock, IconX } from '@tabler/icons-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { z } from 'zod'

const schema = z.object({
	email: z.string().trim(),
	password: z.string().trim(),
})

const LoginDrawer = () => {
	const [loading, setLoading] = useState(false)
	const [opened, { open, close }] = useDisclosure(false)

	const form = useForm({
		validate: zodResolver(schema),
		initialValues: {
			email: '',
			password: '',
		},
	})

	const handleSubmit = async values => {
		setLoading(true)

		const status = await signIn('credentials', {
			redirect: false,
			email: values.email,
			password: values.password,
			callbackUrl: '/',
		})

		if (status.error !== null) {
			setLoading(false)
			notifications.show({
				title: 'Login Failed!',
				message: `${status.error.split(':')[1]}`,
				color: 'red',
				icon: <IconX />,
			})
		} else {
			loadCart()
			close()
		}
	}
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
				<form onSubmit={form.onSubmit(values => handleSubmit(values))}>
					<Stack spacing='md'>
						<TextInput
							label='Email'
							size='md'
							type='email'
							disabled={loading}
							{...form.getInputProps('email')}
						/>
						<PasswordInput
							label='Password'
							size='md'
							disabled={loading}
							{...form.getInputProps('password')}
						/>
						<Button
							size='md'
							variant='outline'
							ff={rajdhani.style.fontFamily}
							color='gray.4'
							loading={loading}
							style={theme => ({
								boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
								color: theme.colors.gray[8],
								fontWeight: 700,
								transition: 'ease-in-out .3s all',
							})}
							type='submit'
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
