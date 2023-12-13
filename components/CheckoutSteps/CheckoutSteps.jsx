'use client'
import {
	Accordion,
	Button,
	Flex,
	Group,
	Radio,
	Select,
	Skeleton,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import {
	IconCheck,
	IconNumber1,
	IconNumber2,
	IconNumber3,
	IconNumber4,
} from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import classes from './CheckoutSteps.module.scss'
import { useSelector } from 'react-redux'
import {
	getLoadingState,
	selectAllCartItems,
	totalCartItemSelector,
} from '@/redux/features/cart/cartSlice'
import CheckoutProductCard from '../CheckoutProductCard/CheckoutProductCard'
import Link from 'next/link'
import { fetcher } from '@/utils/functions'
import { z } from 'zod'
import isNumeric from 'validator/lib/isNumeric'
import isAlpha from 'validator/lib/isAlpha'
import { useForm, zodResolver } from '@mantine/form'
import { getSession, useSession } from 'next-auth/react'

const schema = z.object({
	firstName: z
		.string()
		.trim()
		.min(2, { message: 'First name should have at least 2 letters.' })
		.refine(val => isAlpha(val, 'en-GB', { ignore: ' -' }), {
			message: 'First name contains invalid characters.',
		})
		.refine(val => val !== '', {
			message: 'You must provide your first name.',
		}),
	lastName: z
		.string()
		.trim()
		.min(2, { message: 'Last name should have at least 2 letters.' })
		.refine(val => isAlpha(val, 'en-GB', { ignore: ' -' }), {
			message: 'Last name contains invalid characters.',
		})
		.refine(val => val !== '', {
			message: 'You must provide your last name.',
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
	region: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your region.',
		}),
	town: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your town.',
		}),
	address: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your address.',
		}),
	digitalAddress: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your digital address.',
		}),
})

const CheckoutSteps = () => {
	const [active, setActive] = useState(1)
	const [loading, setLoading] = useState(false)
	const [geoData, setGeoData] = useState(null)
	const [regions, setRegions] = useState([])
	const [towns, setTowns] = useState([])
	const [user, setUser] = useState(null)
	// const cartItemsTotal = useSelector(totalCartItemSelector)
	const cartItems = useSelector(selectAllCartItems)
	const cartLoading = useSelector(getLoadingState)

	const handleRegion = value => {
		form.setFieldValue('region', value)
		setTowns(geoData[value])
		form.setFieldValue('town', geoData[value][0])
	}

	const getUser = async form => {
		const session = await getSession()

		if (session) {
			console.log(session)
			form.setFieldValue('firstName', session.user.firstName)
			form.setFieldValue('lastName', session.user.lastName)
			form.setFieldValue('email', session.user.email)
			form.setFieldValue('phone1', session.user.phone)
			form.setFieldValue(
				'region',
				session.user.deliveryAddresses[0].region
			)
			// setTowns(geoData[session.user.deliveryAddresses[0].region])
			// form.setFieldValue('town', session.user.deliveryAddresses[0].town)
			form.setFieldValue(
				'address',
				session.user.deliveryAddresses[0].address
			)
			form.setFieldValue(
				'digitalAddress',
				session.user.deliveryAddresses[0].digitalAddress
			)
		}
	}

	const form = useForm({
		validate: zodResolver(schema),
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone1: '',
			deliveryMethod: 'pickup',
			region: '',
			town: '',
			paymentMethod: 'cash',
			address: '',
			digitalAddress: '',
		},
	})

	const nextStep = async () => {
		if (active === 1) {
			const firstName = form.validateField('firstName')
			const lastName = form.validateField('lastName')
			const email = form.validateField('email')
			const phone = form.validateField('phone1')

			if (
				firstName.hasError ||
				lastName.hasError ||
				email.hasError ||
				phone.hasError
			) {
				return
			}
			// } else {
			// 	setLoading(true)
			// 	const { status, message } = await fetcher(
			// 		`https://portal.bs42.net/api/users/checkExists?email=${form.values.email}`
			// 	)

			// 	setLoading(false)

			// 	if (status === 'failed') {
			// 		form.setFieldError(
			// 			'email',
			// 			'An account with this email address already exists.'
			// 		)
			// 		return
			// 	}
			// }
		}

		if (active === 2) {
			if (form.values.deliveryMethod === 'delivery') {
				const region = form.validateField('region')
				const town = form.validateField('town')
				const address = form.validateField('address')
				const digitalAddress = form.validateField('digitalAddress')

				if (
					region.hasError ||
					town.hasError ||
					address.hasError ||
					digitalAddress.hasError
				) {
					return
				}
			} else {
				form.setFieldValue('region', '')
				form.setFieldValue('town', '')
				form.setFieldValue('address', '')
				form.setFieldValue('digitalAddress', '')
			}
		}
		setActive(current => (current < 4 ? current + 1 : current))
	}

	const prevStep = () =>
		setActive(current => (current > 0 ? current - 1 : current))

	const fetchRegions = async () => {
		const data = await fetcher('/cities.json')
		setGeoData(data)
		setRegions(Object.keys(data))
	}

	useEffect(() => {
		fetchRegions()
		getUser(form)
	}, [])

	const handleSubmit = () => {
		console.log(form.values)
	}

	const NextPrevButtons = () => {
		return (
			<Group
				justify={active === 1 ? 'flex-end' : 'space-between'}
				mt='xl'
			>
				{active > 1 && (
					<Button variant='default' onClick={prevStep} disabled={loading}>
						Back
					</Button>
				)}

				{active < 4 && (
					<Button onClick={nextStep} loading={loading}>
						Next step
					</Button>
				)}
				{active === 4 && (
					<Button loading={loading} onClick={handleSubmit}>
						Complete
					</Button>
				)}
			</Group>
		)
	}

	return (
		<Accordion
			value={active.toString()}
			chevron={false}
			classNames={{
				control: classes.control,
			}}
		>
			<Accordion.Item key='1' value='1'>
				<Accordion.Control>
					<Flex justify='space-between'>
						<Group>
							<Flex
								className={`${classes.sectionLabelNumber} ${
									active === 1 && classes.active
								} ${active > 1 && classes.completed}`}
							>
								{active > 1 ? (
									<IconCheck size={18} color='white' stroke={2.5} />
								) : (
									<IconNumber1 size={18} stroke={2.5} />
								)}
							</Flex>
							<div>
								<Title order={4} c='gray.7'>
									Customer Details
								</Title>
								<Text size='sm' c='dimmed' fw={400}>
									Provide us with the following details.
								</Text>
							</div>
						</Group>
					</Flex>
				</Accordion.Control>
				<Accordion.Panel>
					<Stack spacing='md'>
						<Group grow>
							<TextInput
								label='First name'
								withAsterisk
								size='md'
								type='text'
								disabled={loading}
								required
								{...form.getInputProps('firstName')}
							/>
							<TextInput
								label='Last name'
								withAsterisk
								size='md'
								type='text'
								disabled={loading}
								required
								{...form.getInputProps('lastName')}
							/>
						</Group>
						<Group grow>
							<TextInput
								withAsterisk
								label='Email address'
								size='md'
								disabled={loading}
								required
								{...form.getInputProps('email')}
							/>
							<TextInput
								withAsterisk
								label='Phone number'
								size='md'
								type='text'
								disabled={loading}
								required
								{...form.getInputProps('phone1')}
							/>
						</Group>
					</Stack>
					<NextPrevButtons />
				</Accordion.Panel>
			</Accordion.Item>

			<Accordion.Item key='2' value='2'>
				<Accordion.Control>
					<Flex justify='space-between'>
						<Group>
							<Flex
								className={`${classes.sectionLabelNumber} ${
									active === 2 && classes.active
								} ${active > 2 && classes.completed}`}
							>
								{active > 2 ? (
									<IconCheck size={18} color='white' stroke={2.5} />
								) : (
									<IconNumber2 size={18} stroke={2.5} />
								)}
							</Flex>
							<div>
								<Title order={4} c='gray.7'>
									Delivery Details
								</Title>
								<Text size='sm' c='dimmed' fw={400}>
									Provide us with the following delivery details.
								</Text>
							</div>
						</Group>
					</Flex>
				</Accordion.Control>
				<Accordion.Panel>
					<Stack spacing='md'>
						<Radio.Group
							label='Delivery Method'
							withAsterisk
							description='Indicate how you would want to receive your order.'
							{...form.getInputProps('deliveryMethod')}
						>
							<Group pt={9}>
								<Radio
									value='pickup'
									label='Pick up'
									size='xs'
									styles={{
										label: {
											paddingLeft: '8px',
											fontSize: '15px',
										},
									}}
								/>
								<Radio
									value='delivery'
									label='Delivery'
									size='xs'
									styles={{
										label: {
											paddingLeft: '8px',
											fontSize: '15px',
										},
									}}
								/>
							</Group>
						</Radio.Group>

						{form.values.deliveryMethod === 'delivery' && (
							<>
								<Group grow>
									<Select
										withAsterisk
										label='Region'
										data={regions}
										size='md'
										searchable
										allowDeselect={false}
										withCheckIcon={false}
										{...form.getInputProps('region')}
										value={form.values.region}
										onChange={value => handleRegion(value)}
									/>
									<Select
										withAsterisk
										disabled={form.values.region === ''}
										label='Town'
										data={towns}
										size='md'
										searchable
										allowDeselect={false}
										withCheckIcon={false}
										{...form.getInputProps('town')}
									/>
								</Group>
								<Group grow>
									<TextInput
										label='Address'
										withAsterisk
										size='md'
										type='text'
										disabled={loading}
										required
										{...form.getInputProps('address')}
									/>
									<TextInput
										label='Digital Address'
										withAsterisk
										size='md'
										type='text'
										disabled={loading}
										required
										{...form.getInputProps('digitalAddress')}
									/>
								</Group>
							</>
						)}
					</Stack>
					<NextPrevButtons />
				</Accordion.Panel>
			</Accordion.Item>

			<Accordion.Item key='3' value='3'>
				<Accordion.Control>
					<Flex justify='space-between'>
						<Group>
							<Flex
								className={`${classes.sectionLabelNumber} ${
									active === 3 && classes.active
								} ${active > 3 && classes.completed}`}
							>
								{active > 3 ? (
									<IconCheck size={18} color='white' stroke={2.5} />
								) : (
									<IconNumber3 size={18} stroke={2.5} />
								)}
							</Flex>
							<div>
								<Title order={4} c='gray.7'>
									Payment Method
								</Title>
								<Text size='sm' c='dimmed' fw={400}>
									Select a payment method.
								</Text>
							</div>
						</Group>
					</Flex>
				</Accordion.Control>
				<Accordion.Panel>
					<Stack spacing='md'>
						<Radio.Group
							withAsterisk
							{...form.getInputProps('paymentMethod')}
						>
							<Group pt={9}>
								<Radio
									value='cash'
									label='Cash'
									size='xs'
									styles={{
										label: {
											paddingLeft: '8px',
											fontSize: '15px',
										},
									}}
								/>
								<Radio
									value='mobileMoney'
									label='Mobile Money'
									disabled
									size='xs'
									styles={{
										label: {
											paddingLeft: '8px',
											fontSize: '15px',
										},
									}}
								/>
								<Radio
									value='debitCard'
									label='Debit Card'
									disabled
									size='xs'
									styles={{
										label: {
											paddingLeft: '8px',
											fontSize: '15px',
										},
									}}
								/>
							</Group>
						</Radio.Group>
					</Stack>
					<NextPrevButtons />
				</Accordion.Panel>
			</Accordion.Item>

			<Accordion.Item key='4' value='4'>
				<Accordion.Control>
					<Flex justify='space-between'>
						<Group>
							<Flex
								className={`${classes.sectionLabelNumber} ${
									active === 4 && classes.active
								} ${active > 4 && classes.completed}`}
							>
								{active > 4 ? (
									<IconCheck size={18} color='white' stroke={2.5} />
								) : (
									<IconNumber4 size={18} stroke={2.5} />
								)}
							</Flex>
							<div>
								<Title order={4} c='gray.7'>
									Review your Cart
								</Title>
								<Text size='sm' c='dimmed' fw={400}>
									Review the items in your cart.
								</Text>
							</div>
						</Group>
						{/* <Link href='/cart' className={classes.cartLink}>
							Edit
						</Link> */}
					</Flex>
				</Accordion.Control>
				<Accordion.Panel>
					{cartItems.map(item => (
						<CheckoutProductCard key={item._id} item={item} />
					))}
					<NextPrevButtons />
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	)
}
export default CheckoutSteps
