'use client'
import Section from '@/components/Section/Section'
import {
	Anchor,
	Button,
	Grid,
	List,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import classes from './LoginForm.module.scss'
import { z } from 'zod'
import Link from 'next/link'
import { useForm, zodResolver } from '@mantine/form'
import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { loadCart } from '@/redux/features/cart/cartActions'

const schema = z.object({
	email: z.string().trim(),
	password: z.string().trim(),
})

const LoginForm = () => {
	const { status } = useSession()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const form = useForm({
		validate: zodResolver(schema),
		initialValues: {
			email: '',
			password: '',
		},
	})

	useEffect(() => {
		if (status === 'authenticated') router.push('/')
	}, [router, status])

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
			router.push('/')
		}
	}
	return (
		<Section>
			<Grid align='flex-start'>
				<Grid.Col
					span={{ base: 12, md: 6 }}
					py={{ md: 'xl' }}
					pr={{ md: 'xl' }}
				>
					<Title className={classes.title} mb='md'>
						Sign into account
					</Title>
					<form onSubmit={form.onSubmit(values => handleSubmit(values))}>
						<Stack spacing='md'>
							<TextInput
								label='Email Address'
								size='md'
								type='email'
								disabled={loading}
								{...form.getInputProps('email')}
							/>
							<PasswordInput
								label='Password'
								size='md'
								type='password'
								disabled={loading}
								{...form.getInputProps('password')}
							/>
							<Button
								size='md'
								variant='outline'
								color='gray.4'
								className={classes.signupBtn}
								loading={loading}
								type='submit'
							>
								Sign in
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
						</Stack>
					</form>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 6 }} bg='gray.0' p='xl'>
					<Title className={classes.title} mb='md'>
						Don&apos;t have an account?
					</Title>
					<Text size='xs' mb={10}>
						Create an account and you&apos;ll be able to:
					</Text>
					<List size='xs' spacing={10} mb={20}>
						<List.Item>Check out faster</List.Item>
						<List.Item>Save multiple shipping addresses</List.Item>
						<List.Item>Access your order history</List.Item>
						<List.Item>Track new orders</List.Item>
					</List>
					<Button
						component={Link}
						href='/create-account'
						size='md'
						variant='filled'
						className={classes.signinBtn}
					>
						Create Account
					</Button>
				</Grid.Col>
			</Grid>
		</Section>
	)
}
export default LoginForm
