import { Box, Container } from '@mantine/core'
import classes from './page.module.scss'
import CartBreadcrumbs from '@/components/CartBreadcrumbs/CartBreadcrumbs'
import CartTable from '@/components/CartTable/CartTable'
import CartFooterButtons from '@/components/CartFooterButtons/CartFooterButtons'
import CartFooterCards from '@/components/CartFoorterCards/CartFooterCards'

const page = () => {
	return (
		<Container py='xl' size='xl'>
			{/* <CartBreadcrumbs /> */}
			<CartTable />

			<CartFooterButtons />
			<CartFooterCards />
		</Container>
	)
}
export default page
