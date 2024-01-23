'use client'
import { useForm, zodResolver } from '@mantine/form'
import { useState } from 'react'
import { z } from 'zod'
import isNumeric from 'validator/lib/isNumeric'
import isAlpha from 'validator/lib/isAlpha'
import isAlphaNumeric from 'validator/lib/isAlphanumeric'
import {
	Button,
	Group,
	Stack,
	TextInput,
	Textarea,
} from '@mantine/core'
import classes from './ContactUsForm.module.scss'
import { IconCheck, IconSend, IconX } from '@tabler/icons-react'
import { fetcher } from '@/utils/functions'
import { notifications } from '@mantine/notifications'

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
	companyName: z.string().trim().refine(isAlphaWithSpacesAndHyphens, {
		message: 'Company contains invalid characters.',
	}),
	email: z
		.string()
		.trim()
		.email({ message: 'You need to provide a valid email address.' }),
	phone: z
		.string()
		.min(10, { message: 'You need to provide a valid phone number.' })
		.refine(val => isNumeric(val), {
			message: 'You need to provide a valid phone number.',
		}),
	question: z
		.string()
		.trim()
		.min(2, { message: 'This field is required.' }),
})

const ContactUsForm = () => {
	const [loading, setLoading] = useState(false)
	const [sent, setSent] = useState(false)

	const form = useForm({
		validate: zodResolver(schema),
		initialValues: {
			firstName: '',
			lastName: '',
			companyName: '',
			email: '',
			phone: '',
			question: '',
		},
	})

	const handleSubmit = async values => {
		setLoading(true)

		const { status, message } = await fetcher('/api/sendMail', {
			method: 'POST',
			body: JSON.stringify(values),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})

		if (status === 'success') {
			notifications.show({
				title: 'Message Received!',
				message:
					'Thank you, we have successfully received your message. You will be contacted soon by a staff member.',
				color: 'green',
				autoClose: false,
				icon: <IconCheck />,
			})
			setSent(true)
		} else {
			notifications.show({
				title: 'Message Not Received!',
				message:
					'Sorry, your message was not received due to some kind of error. Try refreshing the page and try again. If the problem persists, you can contact us via email.',
				color: 'red',
				icon: <IconX />,
			})
		}
	}

	return (
		<form onSubmit={form.onSubmit(values => handleSubmit(values))}>
			<Stack spacing='md' mb='md'>
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
				<Group grow>
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
						{...form.getInputProps('phone')}
					/>
				</Group>
				<TextInput
					label='Company name'
					size='md'
					type='text'
					disabled={loading}
					{...form.getInputProps('companyName')}
				/>

				<Textarea
					label='Comments or Question'
					size='md'
					autosize
					minRows={4}
					withAsterisk
					disabled={loading}
					{...form.getInputProps('question')}
				/>
			</Stack>
			{sent ? (
				''
			) : (
				// <Button
				// 	size='md'
				// 	variant='outline'
				// 	color='gray.4'
				// 	className={classes.sendBtn}
				// 	rightSection={<IconCheck />}
				// 	disabled
				// >
				// 	Message Sent
				// </Button>
				<Button
					size='md'
					variant='outline'
					color='gray.4'
					className={classes.sendBtn}
					type='submit'
					loading={loading}
					rightSection={loading ? '' : <IconSend size={15} stroke={3} />}
				>
					{loading ? 'Sending...' : 'Send'}
				</Button>
			)}
		</form>
	)
}
export default ContactUsForm
