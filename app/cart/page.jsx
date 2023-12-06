import { Container } from '@mantine/core'
import classes from './page.module.scss'
import CartTable from '@/components/CartTable/CartTable'
import CartFooterButtons from '@/components/CartFooterButtons/CartFooterButtons'
import CartFooterCards from '@/components/CartFoorterCards/CartFooterCards'
import CartMobileShowcase from '@/components/CartMobileShowcase/CartMobileShowcase'

export const metadata = {
	title: 'Your cart - BS42.NET',
}

const page = () => {
	return (
		<Container py='xl' size='xl'>
			<CartTable />
			<CartMobileShowcase />
			<CartFooterButtons />
			<CartFooterCards />
		</Container>
	)
}
export default page
