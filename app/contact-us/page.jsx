import ContactUsForm from '@/components/ContactUsForm/ContactUsForm'
import {
	Box,
	Container,
	Divider,
	Flex,
	Grid,
	GridCol,
	Group,
	Stack,
	Text,
	Title,
} from '@mantine/core'
import {
	IconClock,
	IconMail,
	IconMapPin,
	IconPhoneCall,
} from '@tabler/icons-react'

export const metadata = {
	title: 'Contact Us - BS42.NET',
}

const page = () => {
	return (
		<Container py='xl' size='xl'>
			<Title tt='uppercase' order={2} mb='md'>
				Contact Us
			</Title>

			<Grid>
				<GridCol span={{ base: 12, md: 8 }}>
					<Text c='gray' fz={14} maw={360} mb='md'>
						We&apos;re happy to answer questions your question. Please fill
						out the form below if you need assistance.
					</Text>

					<ContactUsForm />
				</GridCol>
				<GridCol span={{ base: 12, md: 4 }} pt={{ md: 100 }}>
					<Stack gap='md'>
						<Group grow align='flex-start'>
							<Stack gap={5}>
								<Flex align='flex-start' gap={5}>
									<IconMapPin stroke={2} size={22} />
									<Title tt='uppercase' order={4}>
										Store Location
									</Title>
								</Flex>

								<Text c='gray' fz={14} maw={360} mb='md'>
									Tycan House, House NO. 43 <br />
									Tetteh Okuley Ave <br /> Abofu - Achimota
								</Text>
							</Stack>

							<Stack gap={5}>
								<Flex align='flex-start' gap={5}>
									<IconMail stroke={2} size={22} />
									<Title tt='uppercase' order={4}>
										Email Address
									</Title>
								</Flex>

								<Text c='gray' fz={14} maw={360} mb='md'>
									info@bs42.net
								</Text>
							</Stack>
						</Group>

						<Group grow align='flex-start'>
							<Stack gap={5}>
								<Flex align='flex-start' gap={5}>
									<IconPhoneCall stroke={2} size={22} />
									<Title tt='uppercase' order={4}>
										Phone Number
									</Title>
								</Flex>

								<Text c='gray' fz={14} maw={360} mb='md'>
									+233-53-493-0002
								</Text>
							</Stack>

							<Stack gap={5}>
								<Flex align='flex-start' gap={5}>
									<IconClock stroke={2} size={22} />
									<Title tt='uppercase' order={4}>
										Opening hours
									</Title>
								</Flex>

								<Text c='gray' fz={14} maw={360} mb='md'>
									Monday to Friday: 9am - 5:30pm
								</Text>
							</Stack>
						</Group>
					</Stack>
				</GridCol>
			</Grid>
		</Container>
	)
}
export default page
