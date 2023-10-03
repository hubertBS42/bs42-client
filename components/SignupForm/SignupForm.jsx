'use client'
import Section from '@/components/Section/Section'
import {
	Button,
	Grid,
	List,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import classes from './SignupForm.module.scss'
import Link from 'next/link'

const SignupForm = () => {
	return (
		<Section>
			<Grid align='flex-start'>
				<Grid.Col
					span={{ base: 12, md: 8 }}
					py={{ md: 'xl' }}
					pr={{ md: 'xl' }}
				>
					<Title className={classes.title} mb='md'>
						Create an account
					</Title>
					<form>
						<Stack spacing='md'>
							<TextInput label='Full Name' size='md' type='text' />
							<TextInput label='Company Name' size='md' type='text' />
							<TextInput label='Email Address' size='md' type='email' />
							<TextInput label='Phone Number' size='md' type='text' />
							<TextInput label='Address' size='md' type='text' />
							<Button
								size='md'
								variant='outline'
								color='gray.4'
								className={classes.signupBtn}
							>
								Create Account
							</Button>
						</Stack>
					</form>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 4 }} bg='gray.0' p='xl'>
					<Title className={classes.title} mb='md'>
						Already have an account?
					</Title>
					<Text size='xs' mb={10}>
						Sign into your account and you&apos;ll be able to:
					</Text>
					<List size='xs' spacing={10} mb={20}>
						<List.Item>Check out faster</List.Item>
						<List.Item>Save multiple shipping addresses</List.Item>
						<List.Item>Access your order history</List.Item>
						<List.Item>Track new orders</List.Item>
					</List>
					<Button
						component={Link}
						href='/login'
						size='md'
						variant='filled'
						className={classes.signinBtn}
					>
						Sign In
					</Button>
				</Grid.Col>
			</Grid>
		</Section>
	)
}
export default SignupForm
