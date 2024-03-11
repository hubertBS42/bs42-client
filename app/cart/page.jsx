import { Container } from '@mantine/core'
import classes from './page.module.scss'
import CartTable from '@/components/CartTable/CartTable'
import CartFooterButtons from '@/components/CartFooterButtons/CartFooterButtons'
import CartFooterCards from '@/components/CartFoorterCards/CartFooterCards'
import CartMobileShowcase from '@/components/CartMobileShowcase/CartMobileShowcase'
import { fetcher } from '@/utils/functions'

export const metadata = {
	title: 'Your Cart - BS42.NET',
}

const page = async () => {
	const { currency } = await fetcher(
		'https://portal.bs42.net/api/frontend/currency/active'
	)

	const rate = currency.isCustomRate
		? currency.customRate
		: currency.history[0].rate

	return (
		<Container py='xl' size='xl'>
			<CartTable rate={rate} />
			<CartMobileShowcase rate={rate} />
			<CartFooterButtons />
			<CartFooterCards rate={rate} />
		</Container>
	)
}
export default page
