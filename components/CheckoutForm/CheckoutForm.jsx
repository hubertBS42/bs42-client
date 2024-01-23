'use client'
import {
	Accordion,
	ActionIcon,
	Box,
	Button,
	Card,
	Flex,
	Grid,
	Group,
	Radio,
	Select,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import {
	IconArrowRight,
	IconCheck,
	IconNumber1,
	IconNumber2,
	IconNumber3,
	IconNumber4,
	IconNumber5,
} from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import classes from './CheckoutForm.module.scss'
import { useSelector } from 'react-redux'
import {
	getLoadingState,
	selectAllCartItems,
	totalCartItemSelector,
	totalPriceSelector,
} from '@/redux/features/cart/cartSlice'
import CheckoutProductCard from '../CheckoutProductCard/CheckoutProductCard'
import {
	extractTowns,
	fetchRegions,
	roundMoney,
} from '@/utils/functions'
import { z } from 'zod'
import isNumeric from 'validator/lib/isNumeric'
import isAlpha from 'validator/lib/isAlpha'
import { useForm, zodResolver } from '@mantine/form'
import { getSession } from 'next-auth/react'
import { getSettings } from '@/redux/features/settings/settingsSlice'

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

const CheckoutForm = () => {
	const [active, setActive] = useState(1)
	// const [loading, setLoading] = useState(false)
	const [regions, setRegions] = useState([])
	const [sTowns, setSTowns] = useState([])
	const [user, setUser] = useState(null)
	const cartItems = useSelector(selectAllCartItems)
	const cartLoading = useSelector(getLoadingState)
	const cartItemsTotal = useSelector(totalCartItemSelector)
	const cartPriceTotal = useSelector(totalPriceSelector)
	const settings = useSelector(getSettings)
	const loading = useSelector(getLoadingState)

	const currentRate = settings[0]?.exchangeRate.currentRate
	const roundedPriceTotal = roundMoney(cartPriceTotal * currentRate)

	const handleRegion = value => {
		const extractedTowns = extractTowns(value)
		form.setFieldValue('sRegion', value)
		setSTowns(extractedTowns)
		form.setFieldValue('sTown', extractedTowns[0])
	}

	const getUser = async form => {
		const session = await getSession()

		if (session) {
			form.setFieldValue('cFName', session.user.firstName)
			form.setFieldValue('cLName', session.user.lastName)
			form.setFieldValue('cEmail', session.user.email)
			form.setFieldValue('cPhone', session.user.phone)
		}
	}

	const form = useForm({
		validate: zodResolver(schema),
		initialValues: {
			cFName: '',
			cLName: '',
			cEmail: '',
			cPhone: '',
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

		// if (active === 2) {
		// 	const firstName = form.validateField('bFName')
		// 	const lastName = form.validateField('bLName')
		// 	const email = form.validateField('bEmail')
		// 	const phone = form.validateField('bPhone')
		// 	const region = form.validateField('bRegion')
		// 	const town = form.validateField('bTown')
		// 	const address = form.validateField('bAddress')

		// 	if (
		// 		firstName.hasError ||
		// 		lastName.hasError ||
		// 		email.hasError ||
		// 		phone.hasError ||
		// 		region.hasError ||
		// 		town.hasError ||
		// 		address.hasError
		// 	) {
		// 		return
		// 	}
		// }

		if (active === 2) {
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
			}
		}
		setActive(current => (current < 4 ? current + 1 : current))
	}

	const handleDeliveryMethod = async value => {
		form.setFieldValue('shippingMethod', value)

		const session = await getSession()

		if (value === 'delivery' && session) {
			form.setFieldValue(
				'sRegion',
				session.user.shippingAddresses[0].region
			)
			const extractedTowns = extractTowns(
				session.user.shippingAddresses[0].region
			)
			setSTowns(extractedTowns)
			form.setFieldValue(
				'sFName',
				session.user.shippingAddresses[0].firstName
			)
			form.setFieldValue(
				'sLName',
				session.user.shippingAddresses[0].lastName
			)
			form.setFieldValue(
				'sEmail',
				session.user.shippingAddresses[0].email
			)
			form.setFieldValue(
				'sPhone',
				session.user.shippingAddresses[0].phone
			)
			form.setFieldValue('sTown', session.user.shippingAddresses[0].town)
			form.setFieldValue(
				'sAddress',
				session.user.shippingAddresses[0].address
			)
			form.setFieldValue(
				'sDigitalAddress',
				session.user.shippingAddresses[0].digitalAddress
			)
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

	const prevStep = () =>
		setActive(current => (current > 0 ? current - 1 : current))

	useEffect(() => {
		const regions = fetchRegions()
		setRegions(regions)
		getUser(form)
	}, [])

	const handleSubmit = async () => {
		const session = await getSession()

		const preparedData = {
			customerInfo: {
				user: session.user.id,
				firstName: form.values.cFName,
				lastName: form.values.cLName,
				email: form.values.cEmail,
				phone: form.values.cPhone,
			},
			rate: currentRate,
			products: cartItems.map(item => {
				return {
					product: item.product._id,
					quantity: item.quantity,
					price: item.product.sellPrice,
				}
			}),
			totalPrice: cartPriceTotal,
			shippingInfo: {
				firstName: form.values.sFName,
				lastName: form.values.sLName,
				email: form.values.sEmail,
				phone: form.values.sFPhone,
				region: form.values.sRegion,
				town: form.values.sTown,
				address: form.values.sAddress,
				digitalAddress: form.values.sDigitalAddress,
			},
			paymentMethod: form.values.paymentMethod,
			shippingMethod: form.values.shippingMethod,
		}
		console.log(preparedData)
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

				{active < 4 && (
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
		<Grid>
			<Grid.Col span={8}>
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
									onChange={handleDeliveryMethod}
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
												onChange={value => handleRegion(value)}
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
											Order Review
										</Title>
										<Text size='sm' c='dimmed' fw={400}>
											Review and confirm your order.
										</Text>
									</div>
								</Group>
							</Flex>
						</Accordion.Control>
						<Accordion.Panel>
							<Grid>
								<Grid.Col span={6}>
									<Stack>
										<Title order={5}>Customer Information</Title>
										<Box>
											<Text>
												{form.values.cFName} {form.values.cLName}
											</Text>
											<Text>{form.values.cEmail}</Text>
											<Text>{form.values.cPhone}</Text>
										</Box>
									</Stack>
								</Grid.Col>
								<Grid.Col span={6}>
									<Stack>
										<Title order={5}>Shipping Information</Title>
										<Box>
											<Text>
												{form.values.sFName} {form.values.sLName}
											</Text>
											<Text>{form.values.sEmail}</Text>
											<Text>{form.values.sPhone}</Text>
											<Text>{form.values.sAddress}</Text>
											<Text>{form.values.sRegion}</Text>
											<Text>{form.values.sTown}</Text>
											<Text>{form.values.sDigitalAddress}</Text>
										</Box>
									</Stack>
								</Grid.Col>
							</Grid>
							{cartItems.map((item, i) => (
								<CheckoutProductCard key={i} item={item} />
							))}
							<NextPrevButtons />
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			</Grid.Col>
			<Grid.Col span={4}>
				<Card radius='sm' className={classes.container} withBorder p='xl'>
					<Title order={4} c='gray.7' tt='uppercase' mb='md'>
						Order Summary:
					</Title>

					<TextInput
						size='md'
						mb='md'
						placeholder='Coupon Code'
						description='Enter coupon codes to apply discounts'
						rightSectionWidth={42}
						rightSection={
							<ActionIcon size={32} variant='filled'>
								<IconArrowRight
									style={{ width: 18, height: 18 }}
									stroke={2}
								/>
							</ActionIcon>
						}
					/>

					<Flex justify='space-between'>
						<Title order={6} c='gray.7'>
							Subtotal:
						</Title>
						<Title order={5} c='gray.7' fw={500}>
							GHS {roundedPriceTotal}
						</Title>
					</Flex>

					<Flex justify='space-between' mb='xs'>
						<Title order={6} c='gray.7'>
							Delivery:
						</Title>
						<Title order={5} c='gray.7' fw={500}>
							GHS 0.00
						</Title>
					</Flex>

					<Flex justify='space-between'>
						<Title order={4} c='gray.8'>
							Grand total:
						</Title>
						<Title order={4} c='gray.8'>
							GHS {roundedPriceTotal}
						</Title>
					</Flex>

					<Button
						size='md'
						mt='md'
						variant='filled'
						fullWidth
						classNames={{
							root: classes.checkoutBtnRoot,
						}}
						loading={loading}
						disabled={active !== 4}
						onClick={handleSubmit}
					>
						Confirm Order
					</Button>
				</Card>
			</Grid.Col>
		</Grid>
	)
}
export default CheckoutForm
