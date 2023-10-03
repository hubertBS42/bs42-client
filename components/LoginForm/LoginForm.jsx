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
import Link from 'next/link'

const LoginForm = () => {
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
					<form>
						<Stack spacing='md'>
							<TextInput label='Email Address' size='md' type='email' />
							<PasswordInput label='Password' size='md' type='password' />
							<Button
								size='md'
								variant='outline'
								color='gray.4'
								className={classes.signupBtn}
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
