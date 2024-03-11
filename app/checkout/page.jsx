import { Container, Title } from '@mantine/core'
import classes from './page.module.scss'
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm'
import { fetcher } from '@/utils/functions'

export const metadata = {
	title: 'Checkout - BS42.NET',
}

const page = async () => {
	const { currency } = await fetcher(
		'https://portal.bs42.net/api/frontend/currency/active'
	)

	const rate = currency.isCustomRate
		? currency.customRate
		: currency.history[0].rate
	return (
		<Container size='xl' py='xl'>
			<Title tt='uppercase' order={2} mb='xl'>
				Checkout
			</Title>
			<CheckoutForm rate={rate} />
		</Container>
	)
}
export default page
