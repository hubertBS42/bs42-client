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
	IconX,
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
	fetcher,
	roundMoney,
} from '@/utils/functions'
import { z } from 'zod'
import isNumeric from 'validator/lib/isNumeric'
import isAlpha from 'validator/lib/isAlpha'
import { useForm, zodResolver } from '@mantine/form'
import { getSession } from 'next-auth/react'
import { getCurrency } from '@/redux/features/currency/currencySlice'
import { notifications } from '@mantine/notifications'

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
	cRegion: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your region.',
		}),
	cTown: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your town.',
		}),
	cAddress: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your address.',
		}),
	cDigitalAddress: z
		.string()
		.trim()
		.refine(val => val !== '', {
			message: 'You must provide your digital address.',
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

const CheckoutForm = ({ rate }) => {
	const [active, setActive] = useState(1)
	const [submitting, setSubmitting] = useState(false)
	const [regions, setRegions] = useState([])
	const [sTowns, setSTowns] = useState([])
	const [cTowns, setCTowns] = useState([])
	const [user, setUser] = useState(null)
	const cartItems = useSelector(selectAllCartItems)
	const cartLoading = useSelector(getLoadingState)
	const cartItemsTotal = useSelector(totalCartItemSelector)
	const cartPriceTotal = useSelector(totalPriceSelector)
	const loading = useSelector(getLoadingState)

	const roundedPriceTotal = roundMoney(cartPriceTotal * rate)

	const handleRegion = (region, category) => {
		const extractedTowns = extractTowns(region)
		if (category === 'customerInfo') {
			form.setFieldValue('cRegion', region)
			setCTowns(extractedTowns)
			form.setFieldValue('cTown', extractedTowns[0])
		} else {
			form.setFieldValue('sRegion', region)
			setSTowns(extractedTowns)
			form.setFieldValue('sTown', extractedTowns[0])
		}
	}

	const getUser = async form => {
		const session = await getSession()

		if (session) {
			form.setFieldValue('cFName', session.user.firstName)
			form.setFieldValue('cLName', session.user.lastName)
			form.setFieldValue('cEmail', session.user.email)
			form.setFieldValue('cPhone', session.user.phone)
			form.setFieldValue(
				'cRegion',
				session.user.residentialAddress.region
			)
			form.setFieldValue('cTown', session.user.residentialAddress.town)
			form.setFieldValue(
				'cAddress',
				session.user.residentialAddress.adress
			)
			form.setFieldValue(
				'cDigitalAddress',
				session.user.residentialAddress.digitalAddress
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
			sFName: '',
			sLName: '',
			sEmail: '',
			sPhone: '',
			sRegion: '',
			sTown: '',
			sAddress: '',
			sDigitalAddress: '',
			cRegion: '',
			cTown: '',
			cAddress: '',
			cDigitalAddress: '',
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
			const region = form.validateField('cRegion')
			const town = form.validateField('cTown')
			const address = form.validateField('cAddress')
			const digitalAddress = form.validateField('cDigitalAddress')

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
		const userID = session?.user.id || null
		let cartToken = localStorage.getItem('cartToken') || null

		if (cartToken) {
			cartToken = JSON.parse(cartToken)
		}

		const preparedData = {
			customerInfo: {
				userRef: session?.user ? session.user.id : null,
				firstName: form.values.cFName,
				lastName: form.values.cLName,
				email: form.values.cEmail,
				phone: form.values.cPhone,
				region: form.values.cRegion,
				town: form.values.cTown,
				address: form.values.cAddress,
				digitalAddress: form.values.cDigitalAddress,
			},
			rate: rate,
			products: cartItems.map(item => {
				return {
					productRef: item.product._id || null,
					title: item.product.title,
					brand: {
						name: item.product.brand.name,
						website: item.product.brand.website,
						logo: item.product.brand.logo.url,
					},
					category: [
						item.product.category.name,
						item.product.category.parent.name,
						item.product.category.parent.parent.name,
					],
					images: item.product.images,
					quantity: item.quantity,
					price: item.product.sellPrice,
				}
			}),
			totalPrice: cartPriceTotal,
			shipping: {
				address: {
					firstName: form.values.sFName,
					lastName: form.values.sLName,
					email: form.values.sEmail,
					phone: form.values.sPhone,
					region: form.values.sRegion,
					town: form.values.sTown,
					address: form.values.sAddress,
					digitalAddress: form.values.sDigitalAddress,
				},
				method: form.values.shippingMethod,
			},
			payment: {
				method: form.values.paymentMethod,
			},
		}

		setSubmitting(true)

		const { status, message } = await fetcher(
			`/api/orders/add?cartToken=${cartToken}&userID=${userID}`,
			{
				method: 'POST',
				body: JSON.stringify(preparedData),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		)

		if (status === 'success') {
			notifications.show({
				title: 'Order Placed!',
				message:
					'You have successfully placed your order! You will be contacted soon by a statff member.',
				color: 'green',
				autoClose: false,
				icon: <IconCheck />,
			})
		} else {
			notifications.show({
				title: 'Order Failed!',
				message:
					'Your order could not be placed. Try refreshing the page and try again. If the problem persists, you can contact us via the Contact us page.1',
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
								<Group grow>
									<Select
										withAsterisk
										label='Region'
										data={regions}
										size='md'
										searchable
										disabled={loading}
										allowDeselect={false}
										withCheckIcon={false}
										{...form.getInputProps('cRegion')}
										value={form.values.cRegion}
										onChange={value => handleRegion(value, 'customerInfo')}
									/>
									<Select
										withAsterisk
										disabled={form.values.cRegion === ''}
										label='Town'
										data={cTowns}
										size='md'
										searchable
										allowDeselect={false}
										withCheckIcon={false}
										{...form.getInputProps('cTown')}
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
										{...form.getInputProps('cAddress')}
									/>
									<TextInput
										label='Digital Address'
										withAsterisk
										size='md'
										type='text'
										disabled={loading}
										required
										{...form.getInputProps('cDigitalAddress')}
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
												disabled={loading}
												allowDeselect={false}
												withCheckIcon={false}
												{...form.getInputProps('sRegion')}
												value={form.values.sRegion}
												onChange={value => handleRegion(value, 'shippingInfo')}
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
								<Grid.Col span={4}>
									<Stack gap={0}>
										<Title className={classes.subTitle} order={5}>
											Customer Information
										</Title>
										<Box>
											<Text className={classes.infoText}>
												Full name: {form.values.cFName} {form.values.cLName}
											</Text>
											<Text className={classes.infoText}>
												Email: {form.values.cEmail}
											</Text>
											<Text className={classes.infoText}>
												Phone: {form.values.cPhone}
											</Text>
										</Box>
									</Stack>
								</Grid.Col>
								<Grid.Col span={4}>
									<Stack gap={0}>
										<Title className={classes.subTitle} order={5}>
											Shipping Information
										</Title>
										<Box>
											<Text className={classes.infoText}>
												Shipping Method:{' '}
												{form.values.shippingMethod === 'pickup'
													? 'Pick up'
													: 'Delivery'}
											</Text>
										</Box>

										{form.values.shippingMethod === 'delivery' && (
											<Box>
												<Text className={classes.infoText}>
													Full name: {form.values.sFName} {form.values.sLName}
												</Text>
												<Text className={classes.infoText}>
													Email: {form.values.sEmail}
												</Text>
												<Text className={classes.infoText}>
													Phone: {form.values.sPhone}
												</Text>
												<Text className={classes.infoText}>
													Address: {form.values.sAddress}
												</Text>
												<Text className={classes.infoText}>
													Region: {form.values.sRegion}
												</Text>
												<Text className={classes.infoText}>
													Town: {form.values.sTown}
												</Text>
												<Text className={classes.infoText}>
													Digital address: {form.values.sDigitalAddress}
												</Text>
											</Box>
										)}
									</Stack>
								</Grid.Col>

								<Grid.Col span={4}>
									<Stack gap={0}>
										<Title className={classes.subTitle} order={5}>
											Payment Information
										</Title>
										<Box>
											<Text className={classes.infoText}>
												Payment Method:{' '}
												{form.values.paymentMethod === 'cash' && 'Cash'}
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
			<Grid.Col span={4}>
				<Card radius='sm' className={classes.container} withBorder p='xl'>
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
						loading={loading || submitting}
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
