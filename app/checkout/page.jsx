import { Container, Title } from '@mantine/core'
import classes from './page.module.scss'
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm'

export const metadata = {
	title: 'Checkout - BS42.NET',
}

const page = () => {
	return (
		<Container size='xl' py='xl'>
			<Title tt='uppercase' order={2} mb='xl'>
				Checkout
			</Title>
			<CheckoutForm />
		</Container>
	)
}
export default page
