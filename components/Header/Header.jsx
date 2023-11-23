'use client'

import {
	Avatar,
	Box,
	Container,
	Grid,
	Group,
	Stack,
	Text,
} from '@mantine/core'
import Link from 'next/link'
import {
	IconMail,
	IconMapPin,
	IconPhoneCall,
} from '@tabler/icons-react'
import Image from 'next/image'
import DesktopLogo from '@/public/images/logo.png'
import MobileLogo from '@/public/images/logo-collapsed1.png'
import LoginDrawer from '../LoginDrawer/LoginDrawer'
import CartDrawer from '../CartDrawer/CartDrawer'
import TopNavLinks from '../TopLinks/TopNavLinks'
import MobileNavDrawer from '../MobileNavDrawer/MobileNavDrawer'
import SearchModal from '../SearchModal/SearchModal'
import MobileSearchModal from '../MobileSearchModal/MobileSearchModal'
import { useEffect } from 'react'
import { fetcher, getInitials } from '@/utils/functions'
import { useDispatch } from 'react-redux'
import { setCategories } from '@/redux/features/categories/categoriesSlice'
import { setProducts } from '@/redux/features/products/productsSlice'
import { setBrands } from '@/redux/features/brands/brandsSlice'
import CategoryMenu from '../CategoryMenu/CategoryMenu'
import { setSettings } from '@/redux/features/settings/settingsSlice'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { useSession } from 'next-auth/react'
import CustomAvatar from '../CustomAvatar/CustomAvatar'
import { loadCart } from '@/redux/features/cart/cartActions'
import { usePathname } from 'next/navigation'

const Header = () => {
	const dispatch = useDispatch()
	const pathname = usePathname()
	const { data: session, status } = useSession()

	useEffect(() => {
		loadCart()
		const fetchAllData = async () => {
			const {
				status,
				message,
				data: { products, categories, brands, settings },
			} = await fetcher('https://portal.bs42.net/api/frontendInitData')

			if (status === 'error') {
				return console.log('Failed to load data.') //message site admin about error
			}

			dispatch(setCategories(categories))
			dispatch(setProducts(products))
			dispatch(setBrands(brands))
			dispatch(setSettings(settings))
		}
		fetchAllData()
	}, [])

	console.log('rendered')
	return (
		<Stack gap={0}>
			<ProgressBar
				height='4px'
				color='#00A4E6'
				options={{ showSpinner: false }}
				shallowRouting
			/>
			<Box
				style={theme => ({
					backgroundColor: theme.colors.gray[0],
					paddingTop: '.7em',
					paddingBottom: '.7em',
					fontSize: 13,
					fontWeight: 400,
				})}
				visibleFrom='md'
			>
				<Container size='xl'>
					<Group justify='space-between'>
						<Link
							href='tel:0261989626'
							style={{
								display: 'flex',
								alignItems: 'center',
								columnGap: '.3em',
							}}
						>
							<IconPhoneCall size='13px' stroke={1.5} /> Call Us Now
						</Link>

						<Link
							href='mailto:info@bs42.net'
							style={{
								display: 'flex',
								alignItems: 'center',
								columnGap: '.3em',
							}}
						>
							<IconMail size='13px' stroke={1.5} />
							info@bs42.net
						</Link>

						<Link
							href='https://goo.gl/maps/2afHuwMpTypev9cFA'
							style={{
								display: 'flex',
								alignItems: 'center',
								columnGap: '.3em',
							}}
						>
							<IconMapPin size='13px' stroke={1.5} />
							Locate Our Shop
						</Link>
					</Group>
				</Container>
			</Box>

			<Box>
				<Container size='xl'>
					<Grid py='.5em'>
						<Grid.Col
							span={3}
							style={{ alignItems: 'center', display: 'flex' }}
						>
							<Group gap={5}>
								<MobileNavDrawer />
								<MobileSearchModal />
								<Box
									component={Link}
									href='/'
									visibleFrom='sm'
									style={{ alignItems: 'center', display: 'flex' }}
								>
									<Image src={DesktopLogo} alt='logo' width={100} priority />
								</Box>
							</Group>
						</Grid.Col>
						<Grid.Col span={6} style={{ textAlign: 'center' }}>
							<Box component={Link} href='/' hiddenFrom='sm'>
								<Image src={MobileLogo} alt='logo' width={30} priority />
							</Box>
							<TopNavLinks />
						</Grid.Col>
						<Grid.Col
							span={3}
							style={{
								alignItems: 'center',
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<Group gap={5}>
								<CartDrawer />
								<SearchModal />
								{session?.user ? (
									<CustomAvatar user={session.user} />
								) : (
									<LoginDrawer />
								)}
							</Group>
						</Grid.Col>
					</Grid>
				</Container>
			</Box>

			{pathname !== '/products' && <CategoryMenu />}
		</Stack>
	)
}
export default Header
