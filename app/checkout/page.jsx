import { Container, Grid, GridCol, Title } from '@mantine/core'
import classes from './page.module.scss'
import CheckoutSteps from '@/components/CheckoutSteps/CheckoutSteps'
import ConfirmOrderCard from '@/components/ConfirmOrderCard/ConfirmOrderCard'

export const metadata = {
	title: 'Checkout - BS42.NET',
}

const page = () => {
	return (
		<Container size='xl' py='xl'>
			<Title tt='uppercase' order={2} mb='xl'>
				Checkout
			</Title>
			<Grid>
				<GridCol span={8}>
					<CheckoutSteps />
				</GridCol>
				<GridCol span={4}>
					<ConfirmOrderCard />
				</GridCol>
			</Grid>
		</Container>
	)
}
export default page
