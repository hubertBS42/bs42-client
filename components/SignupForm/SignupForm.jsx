'use client'
import Section from '@/components/Section/Section'
import {
	Anchor,
	Button,
	Checkbox,
	Grid,
	Group,
	List,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import classes from './SignupForm.module.scss'
import Link from 'next/link'
import { useForm, zodResolver } from '@mantine/form'
import isNumeric from 'validator/lib/isNumeric'
import isAlpha from 'validator/lib/isAlpha'
import isAlphaNumeric from 'validator/lib/isAlphanumeric'
import { IconCheck, IconX } from '@tabler/icons-react'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { fetcher } from '@/utils/functions'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const isAlphaWithSpacesAndHyphens = value => {
	// Allow empty strings
	if (value === '') {
		return true
	}

	// Check if the string contains only alphabetical characters, spaces, and hyphens
	return /^[a-zA-Z -]+$/.test(value)
}

const schema = z.object({
	firstName: z
		.string()
		.trim()
		.min(2, { message: 'First name should have at least 2 letters.' })
		.refine(isAlphaWithSpacesAndHyphens, {
			message: 'First name contains invalid characters.',
		}),
	lastName: z
		.string()
		.trim()
		.min(2, { message: 'Last name should have at least 2 letters.' })
		.refine(isAlphaWithSpacesAndHyphens, {
			message: 'Last name contains invalid characters.',
		}),
	company: z.object({
		name: z.string().trim().refine(isAlphaWithSpacesAndHyphens, {
			message: 'Company contains invalid characters.',
		}),
	}),
	email: z
		.string()
		.trim()
		.email({ message: 'You need to provide a valid email address.' }),
	phone1: z
		.string()
		.min(10, { message: 'You need to provide a valid phone number.' })
		.refine(val => isNumeric(val), {
			message: 'You need to provide a valid phone number.',
		}),
	terms: z.boolean().refine(val => val, {
		message: 'This field needs to be checked.',
	}),
})

const SignupForm = () => {
	const { status } = useSession()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [sent, setSent] = useState(false)

	const form = useForm({
		validate: zodResolver(schema),
		initialValues: {
			firstName: '',
			lastName: '',
			company: {
				name: '',
			},
			email: '',
			phone1: '',
			canReceiveEmails: true,
			terms: false,
		},
	})

	useEffect(() => {
		if (status === 'authenticated') router.push('/')
	}, [router, status])

	const handleSubmit = async values => {
		setLoading(true)

		const { status: existsStatus, message: existsMessage } =
			await fetcher(
				`https://portal.bs42.net/api/users/checkExists?email=${values.email}`
			)

		if (existsStatus === 'failed') {
			setLoading(false)
			form.setFieldError(
				'email',
				'An account with this email address already exists.'
			)

			return
		}

		const { status, message } = await fetcher('/api/applications/add', {
			method: 'POST',
			body: JSON.stringify(values),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})

		if (status === 'success') {
			notifications.show({
				title: 'Registration Completed!',
				message:
					'You have successfully completed the account registration process! You will be notified once your application is approved.',
				color: 'green',
				autoClose: false,
				icon: <IconCheck />,
			})
			setSent(true)
		} else {
			notifications.show({
				title: 'Registration Failed!',
				message:
					'Your account registration failed to complete. Try refreshing the page and try again. If the problem persists, you can contact us via the Contact us page.',
				color: 'red',
				icon: <IconX />,
			})
		}
	}

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
					<form onSubmit={form.onSubmit(values => handleSubmit(values))}>
						<Stack spacing='md'>
							<Group grow>
								<TextInput
									label='First name'
									withAsterisk
									size='md'
									type='text'
									disabled={loading}
									{...form.getInputProps('firstName')}
								/>
								<TextInput
									label='Last name'
									withAsterisk
									size='md'
									type='text'
									disabled={loading}
									{...form.getInputProps('lastName')}
								/>
							</Group>
							<TextInput
								label='Company name'
								size='md'
								type='text'
								disabled={loading}
								{...form.getInputProps('company.name')}
							/>
							<TextInput
								withAsterisk
								label='Email address'
								size='md'
								disabled={loading}
								{...form.getInputProps('email')}
							/>
							<TextInput
								withAsterisk
								label='Phone number'
								size='md'
								type='text'
								disabled={loading}
								{...form.getInputProps('phone1')}
							/>
							<Checkbox
								defaultChecked
								disabled={loading}
								label='I would like to receive occasional emails containing exclusive offers, news and product updates.'
								{...form.getInputProps('canReceiveEmails')}
							/>
							<Checkbox
								disabled={loading}
								label={
									<>
										I have read and agree to the{' '}
										<Anchor href='' target='_blank' inherit>
											Terms and Conditions and Privacy Policy.
										</Anchor>
									</>
								}
								{...form.getInputProps('terms')}
							/>
							{sent ? (
								<Button
									size='md'
									variant='outline'
									color='gray.4'
									className={classes.signupBtn}
									rightSection={<IconCheck />}
									disabled
								>
									Application Sent
								</Button>
							) : (
								<Button
									size='md'
									variant='outline'
									color='gray.4'
									className={classes.signupBtn}
									type='submit'
									loading={loading}
								>
									{loading ? 'Processing...' : 'Create Account'}
								</Button>
							)}
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
