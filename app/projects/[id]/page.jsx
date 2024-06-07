import { Container, Title } from '@mantine/core'

const page = ({ params }) => {
	return (
		<Container py='xl' size='xl'>
			<Title tt='uppercase' order={2} mb={50}>
				Lashibi
			</Title>
		</Container>
	)
}
export default page
