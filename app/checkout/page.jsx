import { Box, Container, Title } from '@mantine/core'
import classes from './page.module.scss'
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm'
import { fetcher } from '@/utils/functions'

export const metadata = {
	title: 'Checkout - BS42.NET',
}

const page = async () => {
	const { rate } = await fetcher(
		'https://portal.bs42.net/api/currencies/current-rate'
	)

	return (
		<Container size='xl' py='xl' pb={100}>
			<CheckoutForm rate={rate} />
		</Container>
	)
}
export default page
