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
	IconNumber5,
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
import {
	extractTowns,
	fetchRegions,
	fetcher,
} from '@/utils/functions'
import { z } from 'zod'
import isNumeric from 'validator/lib/isNumeric'
import isAlpha from 'validator/lib/isAlpha'
import { useForm, zodResolver } from '@mantine/form'
import { getSession, useSession } from 'next-auth/react'

const schema = z.object({
	cFName: z
		.string()
		.trim()
		.min(2, { message: 'First name should have at least 2 letters.' })
		.refine(val => isAlpha(val, 'en-GB', { ignore: ' -' }), {
			message: 'First name contains invalid characters.',
		})
		.refine(val => val !== '', {
			message: 'You must provide your first name.',
		}),
	cLName: z
		.string()
		.trim()
		.min(2, { message: 'Last name should have at least 2 letters.' })
		.refine(val => isAlpha(val, 'en-GB', { ignore: ' -' }), {
			message: 'Last name contains invalid characters.',
		})
		.refine(val => val !== '', {
			message: 'You must provide your last name.',
		}),
	cEmail: z
		.string()
		.trim()
		.email({ message: 'You need to provide a valid email address.' }),
	cPhone: z
		.string()
		.min(10, { message: 'You need to provide a valid phone number.' })
		.refine(val => isNumeric(val), {
			message: 'You need to provide a valid phone number.',
		}),
	bFName: z
		.string()
		.trim()
		.min(2, { message: 'First name should have at least 2 letters.' })
		.refine(val => isAlpha(val, 'en-GB', { ignore: ' -' }), {
			message: 'First name contains invalid characters.',
		})
		.refine(val => val !== '', {
			message: 'You must provide your first name.',
		}),
	bLName: z
		.string()
		.trim()
		.min(2, { message: 'Last name should have at least 2 letters.' })
		.refine(val => isAlpha(val, 'en-GB', { ignore: ' -' }), {
			message: 'Last name contains invalid characters.',
		})
		.refine(val => val !== '', {
			message: 'You must provide your last name.',
		}),
	bEmail: z
		.string()
		.trim()
		.email({ message: 'You need to provide a valid email address.' }),
	bPhone: z
		.string()
		.min(10, { message: 'You need to provide a valid phone number.' })
		.refine(val => isNumeric(val), {
			message: 'You need to provide a valid phone number.',
		}),
	bRegion: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your region.',
		}),
	bTown: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your town.',
		}),
	bAddress: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your address.',
		}),
	sFName: z
		.string()
		.trim()
		.min(2, { message: 'First name should have at least 2 letters.' })
		.refine(val => isAlpha(val, 'en-GB', { ignore: ' -' }), {
			message: 'First name contains invalid characters.',
		})
		.refine(val => val !== '', {
			message: 'You must provide your first name.',
		}),
	sLName: z
		.string()
		.trim()
		.min(2, { message: 'Last name should have at least 2 letters.' })
		.refine(val => isAlpha(val, 'en-GB', { ignore: ' -' }), {
			message: 'Last name contains invalid characters.',
		})
		.refine(val => val !== '', {
			message: 'You must provide your last name.',
		}),
	sEmail: z
		.string()
		.trim()
		.email({ message: 'You need to provide a valid email address.' }),
	sPhone: z
		.string()
		.min(10, { message: 'You need to provide a valid phone number.' })
		.refine(val => isNumeric(val), {
			message: 'You need to provide a valid phone number.',
		}),
	sRegion: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your region.',
		}),
	sTown: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your town.',
		}),
	sAddress: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your address.',
		}),
	sDigitalAddress: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your digital address.',
		}),
})

const CheckoutSteps = () => {
	const [active, setActive] = useState(1)
	const [loading, setLoading] = useState(false)
	// const [geoData, setGeoData] = useState(null)
	const [regions, setRegions] = useState([])
	const [bTowns, setBTowns] = useState([])
	const [sTowns, setSTowns] = useState([])
	const [user, setUser] = useState(null)
	// const cartItemsTotal = useSelector(totalCartItemSelector)
	const cartItems = useSelector(selectAllCartItems)
	const cartLoading = useSelector(getLoadingState)

	const handleRegion = (value, section) => {
		const extractedTowns = extractTowns(value)
		if (section === 'billing') {
			form.setFieldValue('bRegion', value)
			setBTowns(extractedTowns)
			form.setFieldValue('bTown', extractedTowns[0])
		} else {
			form.setFieldValue('sRegion', value)
			setSTowns(extractedTowns)
			form.setFieldValue('sTown', extractedTowns[0])
		}
	}

	const getUser = async form => {
		const session = await getSession()

		if (session) {
			form.setFieldValue('firstName', session.user.firstName)
			form.setFieldValue('lastName', session.user.lastName)
			form.setFieldValue('email', session.user.email)
			form.setFieldValue('phone1', session.user.phone)
			form.setFieldValue(
				'region',
				session.user.deliveryAddresses[0].region
			)
			const extractedTowns = extractTowns(
				session.user.deliveryAddresses[0].region
			)
			setTowns(extractedTowns)
			form.setFieldValue('town', session.user.deliveryAddresses[0].town)
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
			cFName: '',
			cLName: '',
			cEmail: '',
			cPhone: '',
			bFName: '',
			bLName: '',
			bEmail: '',
			bPhone: '',
			bRegion: '',
			bTown: '',
			bAddress: '',
			sFName: '',
			sLName: '',
			sEmail: '',
			sPhone: '',
			sRegion: '',
			sTown: '',
			sAddress: '',
			sAddress: '',
			sDigitalAddress: '',
			shippingMethod: 'pickup',
			paymentMethod: 'cash',
		},
	})

	const nextStep = async () => {
		if (active === 1) {
			const firstName = form.validateField('cFName')
			const lastName = form.validateField('cLName')
			const email = form.validateField('cEmail')
			const phone = form.validateField('cPhone')

			if (
				firstName.hasError ||
				lastName.hasError ||
				email.hasError ||
				phone.hasError
			) {
				return
			}
		}

		if (active === 2) {
			const firstName = form.validateField('bFName')
			const lastName = form.validateField('bLName')
			const email = form.validateField('bEmail')
			const phone = form.validateField('bPhone')
			const region = form.validateField('bRegion')
			const town = form.validateField('bTown')
			const address = form.validateField('bAddress')

			if (
				firstName.hasError ||
				lastName.hasError ||
				email.hasError ||
				phone.hasError ||
				region.hasError ||
				town.hasError ||
				address.hasError
			) {
				return
			}
		}

		if (active === 3) {
			if (form.values.shippingMethod === 'delivery') {
				const firstName = form.validateField('sFName')
				const lastName = form.validateField('sLName')
				const email = form.validateField('sEmail')
				const phone = form.validateField('sPhone')
				const region = form.validateField('sRegion')
				const town = form.validateField('sTown')
				const address = form.validateField('sAddress')
				const digitalAddress = form.validateField('sDigitalAddress')

				if (
					firstName.hasError ||
					lastName.hasError ||
					email.hasError ||
					phone.hasError ||
					region.hasError ||
					town.hasError ||
					address.hasError ||
					digitalAddress.hasError
				) {
					return
				}
			} else {
				form.setFieldValue('sFName', '')
				form.setFieldValue('sLName', '')
				form.setFieldValue('sEmail', '')
				form.setFieldValue('sPhone', '')
				form.setFieldValue('sRegion', '')
				form.setFieldValue('sTown', '')
				form.setFieldValue('sAddress', '')
				form.setFieldValue('sDigitalAddress', '')
			}
		}
		setActive(current => (current < 5 ? current + 1 : current))
	}

	const prevStep = () =>
		setActive(current => (current > 0 ? current - 1 : current))

	useEffect(() => {
		const regions = fetchRegions()
		setRegions(regions)
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
					<Button
						variant='default'
						onClick={prevStep}
						disabled={loading}
						classNames={{
							root: classes.btnRoot,
						}}
					>
						Back
					</Button>
				)}

				{active < 5 && (
					<Button
						onClick={nextStep}
						loading={loading}
						classNames={{
							root: classes.btnRoot,
						}}
					>
						Next
					</Button>
				)}
				{/* {active === 5 && (
					<Button loading={loading} onClick={handleSubmit}>
						Complete
					</Button>
				)} */}
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
									Customer Information
								</Title>
								<Text size='sm' c='dimmed' fw={400}>
									Provide us with the following information.
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
								{...form.getInputProps('cFName')}
							/>
							<TextInput
								label='Last name'
								withAsterisk
								size='md'
								type='text'
								disabled={loading}
								required
								{...form.getInputProps('cLName')}
							/>
						</Group>
						<Group grow>
							<TextInput
								withAsterisk
								label='Email address'
								size='md'
								disabled={loading}
								required
								{...form.getInputProps('cEmail')}
							/>
							<TextInput
								withAsterisk
								label='Phone number'
								size='md'
								type='text'
								disabled={loading}
								required
								{...form.getInputProps('cPhone')}
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
									Billing Information
								</Title>
								<Text size='sm' c='dimmed' fw={400}>
									Provide us with the following information.
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
								{...form.getInputProps('bFName')}
							/>
							<TextInput
								label='Last name'
								withAsterisk
								size='md'
								type='text'
								disabled={loading}
								required
								{...form.getInputProps('bLName')}
							/>
						</Group>
						<Group grow>
							<TextInput
								withAsterisk
								label='Email address'
								size='md'
								disabled={loading}
								required
								{...form.getInputProps('bEmail')}
							/>
							<TextInput
								withAsterisk
								label='Phone number'
								size='md'
								type='text'
								disabled={loading}
								required
								{...form.getInputProps('bPhone')}
							/>
						</Group>
						<Group grow>
							<Select
								withAsterisk
								label='Region'
								data={regions}
								size='md'
								searchable
								allowDeselect={false}
								withCheckIcon={false}
								{...form.getInputProps('bRegion')}
								value={form.values.bRegion}
								onChange={value => handleRegion(value, 'billing')}
							/>
							<Select
								withAsterisk
								disabled={form.values.bRegion === ''}
								label='Town'
								data={bTowns}
								size='md'
								searchable
								allowDeselect={false}
								withCheckIcon={false}
								{...form.getInputProps('bTown')}
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
								{...form.getInputProps('bAddress')}
							/>
						</Group>
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
									Shipping Information
								</Title>
								<Text size='sm' c='dimmed' fw={400}>
									Provide us with the following information.
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
							{...form.getInputProps('shippingMethod')}
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

						{form.values.shippingMethod === 'delivery' && (
							<>
								<Group grow>
									<TextInput
										label='First name'
										withAsterisk
										size='md'
										type='text'
										disabled={loading}
										required
										{...form.getInputProps('sFName')}
									/>
									<TextInput
										label='Last name'
										withAsterisk
										size='md'
										type='text'
										disabled={loading}
										required
										{...form.getInputProps('sLName')}
									/>
								</Group>
								<Group grow>
									<TextInput
										withAsterisk
										label='Email address'
										size='md'
										disabled={loading}
										required
										{...form.getInputProps('sEmail')}
									/>
									<TextInput
										withAsterisk
										label='Phone number'
										size='md'
										type='text'
										disabled={loading}
										required
										{...form.getInputProps('sPhone')}
									/>
								</Group>
								<Group grow>
									<Select
										withAsterisk
										label='Region'
										data={regions}
										size='md'
										searchable
										allowDeselect={false}
										withCheckIcon={false}
										{...form.getInputProps('sRegion')}
										value={form.values.sRegion}
										onChange={value => handleRegion(value, 'shipping')}
									/>
									<Select
										withAsterisk
										disabled={form.values.sRegion === ''}
										label='Town'
										data={sTowns}
										size='md'
										searchable
										allowDeselect={false}
										withCheckIcon={false}
										{...form.getInputProps('sTown')}
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
										{...form.getInputProps('sAddress')}
									/>
									<TextInput
										label='Digital Address'
										withAsterisk
										size='md'
										type='text'
										disabled={loading}
										required
										{...form.getInputProps('sDigitalAddress')}
									/>
								</Group>
							</>
						)}
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

			<Accordion.Item key='5' value='5'>
				<Accordion.Control>
					<Flex justify='space-between'>
						<Group>
							<Flex
								className={`${classes.sectionLabelNumber} ${
									active === 5 && classes.active
								} ${active > 5 && classes.completed}`}
							>
								{active > 5 ? (
									<IconCheck size={18} color='white' stroke={2.5} />
								) : (
									<IconNumber5 size={18} stroke={2.5} />
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
