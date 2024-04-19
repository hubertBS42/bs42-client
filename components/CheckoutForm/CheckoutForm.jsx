'use client'
import {
	Accordion,
	Box,
	Button,
	Card,
	Flex,
	Grid,
	Group,
	Radio,
	Select,
	SimpleGrid,
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
	IconX,
} from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import classes from './CheckoutForm.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
	emptyCart,
	getLoadingState,
	selectAllCartItems,
	totalPriceSelector,
} from '@/redux/features/cart/cartSlice'
import CheckoutProductCard from '../CheckoutProductCard/CheckoutProductCard'
import { extractTowns, fetcher, roundMoney } from '@/utils/functions'
import { z } from 'zod'
import isNumeric from 'validator/lib/isNumeric'
import isAlpha from 'validator/lib/isAlpha'
import { useForm, zodResolver } from '@mantine/form'
import { getSession } from 'next-auth/react'
import { notifications } from '@mantine/notifications'
import { usePathname } from 'next/navigation'
import OrderReceived from '../OrderReceived/OrderReceived'
import { geoData } from '@/utils/data'

const schema = z.object({
	contact: z.object({
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
		phone: z
			.string()
			.min(10, { message: 'You need to provide a valid phone number.' })
			.refine(val => isNumeric(val), {
				message: 'You need to provide a valid phone number.',
			}),
	}),
	billing: z.object({
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
	}),
	shipping: z.object({
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
		phone: z
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
	}),
})

const CheckoutForm = ({ rate }) => {
	const [active, setActive] = useState(1)
	const [submitting, setSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [order, setOrder] = useState(null)
	const [regions, setRegions] = useState([])
	const [billingTowns, setBillingTowns] = useState([])
	const [shippingTowns, setShippingTowns] = useState([])

	const cartItems = useSelector(selectAllCartItems)
	const cartPriceTotal = useSelector(totalPriceSelector)
	const loading = useSelector(getLoadingState)
	const dispatch = useDispatch()
	const pathname = usePathname()

	const getUser = async form => {
		const session = await getSession()

		if (session) {
			form.setFieldValue('contact.firstName', session.user.firstName)
			form.setFieldValue('contact.lastName', session.user.lastName)
			form.setFieldValue('contact.email', session.user.email)
			form.setFieldValue('contact.phone', session.user.phone)
			form.setFieldValue(
				'billing.firstName',
				session.user?.billing?.firstName || ''
			)
			form.setFieldValue(
				'billing.lastName',
				session.user?.billing?.lastName || ''
			)
			form.setFieldValue(
				'billing.email',
				session.user?.billing?.email || ''
			)
			form.setFieldValue(
				'billing.region',
				session.user?.billing?.region || ''
			)

			const towns = extractTowns(session.user?.billing?.region)

			setBillingTowns(towns)

			form.setFieldValue(
				'billing.town',
				session.user?.billing?.town || ''
			)
			form.setFieldValue(
				'billing.address',
				session.user?.billing?.address || ''
			)
		}
	}

	const form = useForm({
		validate: zodResolver(schema),
		initialValues: {
			contact: {
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
			},
			billing: {
				firstName: '',
				lastName: '',
				email: '',
				region: '',
				town: '',
				address: '',
			},
			shipping: {
				firstName: '',
				lastName: '',
				phone: '',
				region: '',
				town: '',
				address: '',
				method: 'pickup',
			},
			payment: {
				method: 'cash',
			},
		},
	})

	const roundedPriceTotal = roundMoney(cartPriceTotal * rate)

	const nextStep = async () => {
		if (active === 1) {
			const firstName = form.validateField('contact.firstName')
			const lastName = form.validateField('contact.lastName')
			const email = form.validateField('contact.email')
			const phone = form.validateField('contact.phone')

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
			const firstName = form.validateField('billing.firstName')
			const lastName = form.validateField('billing.lastName')
			const email = form.validateField('billing.email')
			const region = form.validateField('billing.region')
			const town = form.validateField('billing.town')
			const address = form.validateField('billing.address')

			if (
				firstName.hasError ||
				lastName.hasError ||
				email.hasError ||
				region.hasError ||
				town.hasError ||
				address.hasError
			) {
				return
			}
		}

		if (active === 3) {
			if (form.values.shipping.method === 'delivery') {
				const firstName = form.validateField('shipping.firstName')
				const lastName = form.validateField('shipping.lastName')
				const phone = form.validateField('shipping.phone')
				const region = form.validateField('shipping.region')
				const town = form.validateField('shipping.town')
				const address = form.validateField('shipping.address')

				if (
					firstName.hasError ||
					lastName.hasError ||
					phone.hasError ||
					region.hasError ||
					town.hasError ||
					address.hasError
				) {
					return
				}
			}
		}

		setActive(current => (current < 5 ? current + 1 : current))
	}

	const handleDeliveryMethod = async value => {
		form.setFieldValue('shipping.method', value)

		const session = await getSession()

		if (value === 'delivery' && session) {
			const shipping = session.user.shipping.find(
				address => address.isPrimary
			)

			form.setFieldValue('shipping.region', shipping?.region || '')
			const towns = extractTowns(shipping?.region || '')
			setShippingTowns(towns)
			form.setFieldValue('shipping.firstName', shipping?.firstName || '')
			form.setFieldValue('shipping.lastName', shipping?.lastName || '')
			form.setFieldValue('shipping.phone', shipping?.phone || '')
			form.setFieldValue('shipping.town', shipping?.town || '')
			form.setFieldValue('shipping.address', shipping?.address || '')
		} else {
			form.setFieldValue('shipping.firstName', '')
			form.setFieldValue('shipping.lastName', '')
			form.setFieldValue('shipping.phone', '')
			form.setFieldValue('shipping.region', '')
			form.setFieldValue('shipping.town', '')
			form.setFieldValue('shipping.address', '')
		}
	}

	const prevStep = () =>
		setActive(current => (current > 0 ? current - 1 : current))

	useEffect(() => {
		const data = geoData.map(region => region.name)

		setRegions(data)
		getUser(form)
	}, [])

	const handleSubmit = async () => {
		const session = await getSession()
		const userID = session?.user.id || null
		let cartToken = localStorage.getItem('cartToken') || null

		if (cartToken) {
			cartToken = JSON.parse(cartToken)
		}

		const preparedData = {
			user: session?.user ? session.user.id : null,
			...form.values,
			rate,
			products: cartItems?.map(item => {
				return {
					productRef: item.product._id || null,
					title: item.product.title,
					brand: {
						name: item.product.brand.name,
					},
					category: [
						item?.product?.category?.name,
						item?.product?.category?.parent?.name,
						item?.product?.category?.parent?.parent?.name,
					],
					images: item.product.images,
					quantity: item.quantity,
					price: item.product.sellPrice,
				}
			}),
			total: cartPriceTotal,
			subtotal: cartPriceTotal,
		}

		setSubmitting(true)

		const { status, message, data } = await fetcher(
			`/api/frontend/orders/add?cartToken=${cartToken}&userID=${userID}`,
			{
				method: 'POST',
				body: JSON.stringify(preparedData),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		)

		if (status === 'success') {
			localStorage.removeItem('cartToken')
			dispatch(emptyCart())
			setOrder(data)
			setSubmitted(true)
		} else {
			notifications.show({
				title: 'Order Failed!',
				message:
					'Your order could not be placed. Try refreshing the page and try again. If the problem persists, you can contact us via the Contact us page.',
				color: 'red',
				icon: <IconX />,
			})
		}

		setSubmitting(false)
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
						disabled={loading || submitted || submitting}
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
						loading={loading || submitted}
						classNames={{
							root: classes.btnRoot,
						}}
					>
						Next
					</Button>
				)}
			</Group>
		)
	}

	if (submitted) return <OrderReceived order={order} />
	return (
		<>
			<Title tt='uppercase' order={2} mb='xl'>
				Checkout
			</Title>
			<Grid>
				<Grid.Col span={{ base: 12, md: 8 }}>
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
												Contact Information
											</Title>
											<Text size='sm' c='dimmed' fw={400}>
												Provide us with the following information.
											</Text>
										</div>
									</Group>
								</Flex>
							</Accordion.Control>
							<Accordion.Panel>
								<SimpleGrid spacing='md' cols={{ base: 1, sm: 2 }}>
									<TextInput
										label='First name'
										withAsterisk
										size='md'
										type='text'
										disabled={loading}
										required
										{...form.getInputProps('contact.firstName')}
									/>
									<TextInput
										label='Last name'
										withAsterisk
										size='md'
										type='text'
										disabled={loading}
										required
										{...form.getInputProps('contact.lastName')}
									/>
									<TextInput
										withAsterisk
										label='Email address'
										size='md'
										disabled={loading}
										required
										{...form.getInputProps('contact.email')}
									/>
									<TextInput
										withAsterisk
										label='Phone number'
										size='md'
										type='text'
										disabled={loading}
										required
										{...form.getInputProps('contact.phone')}
									/>
								</SimpleGrid>

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
								<SimpleGrid spacing='md' cols={{ base: 1, sm: 2 }}>
									<TextInput
										label='First name'
										withAsterisk
										size='md'
										type='text'
										disabled={loading}
										required
										{...form.getInputProps('billing.firstName')}
									/>
									<TextInput
										label='Last name'
										withAsterisk
										size='md'
										type='text'
										disabled={loading}
										required
										{...form.getInputProps('billing.lastName')}
									/>
									<TextInput
										withAsterisk
										label='Email address'
										size='md'
										disabled={loading}
										required
										{...form.getInputProps('billing.email')}
									/>
									<Select
										withAsterisk
										label='Region'
										data={regions}
										size='md'
										searchable
										disabled={loading}
										allowDeselect={false}
										withCheckIcon={false}
										{...form.getInputProps('billing.region')}
										value={form.values.billing.region}
										onChange={value => {
											const towns = extractTowns(value)
											setBillingTowns(towns)
											form.setFieldValue('billing.region', value)
											form.setFieldValue('billing.town', towns[0])
										}}
									/>
									<Select
										withAsterisk
										disabled={form.values.billing.region === ''}
										label='Town'
										data={billingTowns}
										size='md'
										searchable
										allowDeselect={false}
										withCheckIcon={false}
										{...form.getInputProps('billing.town')}
										onChange={value =>
											form.setFieldValue('billing.town', value)
										}
										value={form.values.billing.town}
									/>
									<TextInput
										label='Address'
										withAsterisk
										size='md'
										type='text'
										disabled={loading}
										required
										{...form.getInputProps('billing.address')}
									/>
								</SimpleGrid>

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
										{...form.getInputProps('shipping.method')}
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

									{form.values.shipping.method === 'delivery' && (
										<SimpleGrid spacing='md' cols={{ base: 1, sm: 2 }}>
											<TextInput
												label='First name'
												withAsterisk
												size='md'
												type='text'
												disabled={loading}
												{...form.getInputProps('shipping.firstName')}
											/>
											<TextInput
												label='Last name'
												withAsterisk
												size='md'
												type='text'
												disabled={loading}
												{...form.getInputProps('shipping.lastName')}
											/>
											<TextInput
												withAsterisk
												label='Phone number'
												size='md'
												type='text'
												disabled={loading}
												{...form.getInputProps('shipping.phone')}
											/>
											<Select
												withAsterisk
												label='Region'
												data={regions}
												size='md'
												searchable
												disabled={loading}
												allowDeselect={false}
												withCheckIcon={false}
												{...form.getInputProps('shipping.region')}
												value={form.values.shipping.region}
												onChange={value => {
													const towns = extractTowns(value)
													setShippingTowns(towns)
													form.setFieldValue('shipping.region', value)
													form.setFieldValue('shipping.town', towns[0])
												}}
											/>
											<Select
												withAsterisk
												disabled={form.values.shipping.region === ''}
												label='Town'
												data={shippingTowns}
												size='md'
												searchable
												allowDeselect={false}
												withCheckIcon={false}
												{...form.getInputProps('shipping.town')}
												onChange={value =>
													form.setFieldValue('shipping.town', value)
												}
												value={shippingTowns[0]}
											/>
											<TextInput
												label='Address'
												withAsterisk
												size='md'
												type='text'
												disabled={loading}
												{...form.getInputProps('shipping.address')}
											/>
										</SimpleGrid>
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
										{...form.getInputProps('payment.method')}
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
									<Grid.Col span={4}>
										<Stack gap={0}>
											<Title className={classes.subTitle} order={5}>
												Contact Information
											</Title>
											<Box>
												<Text className={classes.infoText}>
													{form.values.contact.firstName}{' '}
													{form.values.contact.lastName}
												</Text>
												<Text className={classes.infoText}>
													{form.values.contact.email}
												</Text>
												<Text className={classes.infoText}>
													{form.values.contact.phone}
												</Text>
											</Box>
										</Stack>
									</Grid.Col>
									<Grid.Col span={4}>
										<Stack gap={0}>
											<Title className={classes.subTitle} order={5}>
												Billing Information
											</Title>

											<Box mb='md'>
												<Text className={classes.infoText}>
													{form.values.billing.firstName}{' '}
													{form.values.billing.lastName}
												</Text>
												<Text className={classes.infoText}>
													{form.values.billing.email}
												</Text>
												<Text className={classes.infoText}>
													{form.values.billing.address}
												</Text>
												<Text className={classes.infoText}>
													{form.values.billing.town}, {form.values.billing.region}
												</Text>
											</Box>
										</Stack>
									</Grid.Col>
									{form.values.shipping.method === 'delivery' && (
										<Grid.Col span={4}>
											<Stack gap={0}>
												<Title className={classes.subTitle} order={5}>
													Shipping Information
												</Title>

												<Box mb='md'>
													<Text className={classes.infoText}>
														{form.values.shipping.firstName}{' '}
														{form.values.shipping.lastName}
													</Text>
													<Text className={classes.infoText}>
														{form.values.shipping.phone}
													</Text>
													<Text className={classes.infoText}>
														{form.values.shipping.address}
													</Text>
													<Text className={classes.infoText}>
														{form.values.shipping.town},{' '}
														{form.values.shipping.region}
													</Text>
												</Box>
											</Stack>
										</Grid.Col>
									)}

									<Grid.Col span={4}>
										<Stack gap={0}>
											<Title className={classes.subTitle} order={5}>
												Payment And Shipment Information
											</Title>
											<Box>
												<Text className={classes.infoText}>
													Payment Method:{' '}
													{form.values.payment.method === 'cash' && 'Cash'}
												</Text>
												<Text className={classes.infoText}>
													Shipping Method:{' '}
													{form.values.shipping.method === 'pickup'
														? 'Pick up'
														: 'Delivery'}
												</Text>
											</Box>
										</Stack>
									</Grid.Col>

									<Grid.Col span={12}>
										<Stack gap={0}>
											<Title className={classes.subTitle} order={5}>
												Products in Cart
											</Title>

											{cartItems.map((item, i) => (
												<CheckoutProductCard key={i} item={item} rate={rate} />
											))}
										</Stack>
									</Grid.Col>
								</Grid>

								<NextPrevButtons />
							</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 4 }}>
					<Card
						radius='sm'
						className={classes.container}
						withBorder
						p='xl'
					>
						<Title order={4} c='gray.7' tt='uppercase' mb='md'>
							Order Summary:
						</Title>

						{/* <TextInput
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
					/> */}

						<Flex justify='space-between'>
							<Title order={6} c='gray.7'>
								Subtotal:
							</Title>
							<Title order={5} c='gray.7' fw={500}>
								GHS {roundedPriceTotal}
							</Title>
						</Flex>

						{form.values.shipping.method === 'delivery' && (
							<Flex justify='space-between' mb='xs'>
								<Title order={6} c='gray.7'>
									Delivery:
								</Title>
								<Title order={5} c='gray.7' fw={500}>
									TBD
								</Title>
							</Flex>
						)}

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
							loading={loading || submitting}
							disabled={active !== 5 || submitted}
							onClick={handleSubmit}
						>
							{submitted ? 'Order Placed' : 'Confirm Order'}
						</Button>
					</Card>
				</Grid.Col>
			</Grid>
		</>
	)
}
export default CheckoutForm
