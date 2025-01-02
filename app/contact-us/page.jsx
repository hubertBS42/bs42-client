import ContactUsForm from '@/components/ContactUsForm/ContactUsForm'
import {
	Container,
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
import classes from './page.module.scss'
import Link from 'next/link'
import ukFlag from '@/public/images/united-kingdom.png'
import ghanaFlag from '@/public/images/ghana.png'
import Image from 'next/image'

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
					<Text c='gray' fz={14} mb='md'>
						We&apos;re happy to answer questions your question. Please fill
						out the form below if you need assistance.
					</Text>

					<ContactUsForm />
				</GridCol>
				<GridCol span={{ base: 12, md: 4 }} pt={{ md: 100 }}>
					<Stack gap='md'>
						<Group grow align='flex-start'>
							<Flex align='flex-start' gap={6}>
								<IconMapPin stroke={2} size={20} />
								<Stack gap={5}>
									<Title order={4} className={classes.subtitle}>
										Store Location
									</Title>
									<Link
										href='https://maps.app.goo.gl/6JBVscgWE2sTTZX78'
										target='_blank'
									>
										<Text c='gray' fz={13} maw={360} mb='md'>
											Tycan House, House NO. 43 <br />
											Tetteh Okuley Ave <br /> Abofu - Achimota
										</Text>
									</Link>
								</Stack>
							</Flex>

							<Flex align='flex-start' gap={6}>
								<IconMail stroke={2} size={20} />
								<Stack gap={5}>
									<Title order={4} className={classes.subtitle}>
										Email Address
									</Title>
									<Link href='mailto:info@bs42.net'>
										<Text c='gray' fz={13} maw={360} mb='md'>
											info@bs42.net
										</Text>
									</Link>
								</Stack>
							</Flex>
						</Group>

						<Group grow align='flex-start'>
							<Flex align='flex-start' gap={6}>
								<IconPhoneCall stroke={2} size={20} />
								<Stack gap={5}>
									<Title order={4} className={classes.subtitle}>
										Phone Numbers
									</Title>
									<Link href='tel:+233534930002' style={{ display: 'flex' }}>
										<Text
											c='gray'
											fz={13}
											maw={360}
											style={{ display: 'flex', alignItems: 'center', gap: 5 }}
										>
											<Image alt='Ghanaian flag' src={ghanaFlag} width={20} />
											+233-53-493-0002
										</Text>
									</Link>
									<Link href='tel:+442079890708' style={{ display: 'flex' }}>
										<Text
											c='gray'
											fz={13}
											maw={360}
											mb='md'
											style={{ display: 'flex', alignItems: 'center', gap: 5 }}
										>
											<Image alt='UK flag' src={ukFlag} width={20} />
											+44-207-989-0708
										</Text>
									</Link>
								</Stack>
							</Flex>

							<Flex align='flex-start' gap={6}>
								<IconClock stroke={2} size={20} />
								<Stack gap={5}>
									<Title order={4} className={classes.subtitle}>
										Opening hours
									</Title>
									<Text c='gray' fz={13} maw={360} mb='md'>
										Monday to Friday: 9am - 5:30pm
									</Text>
								</Stack>
							</Flex>
						</Group>
					</Stack>
				</GridCol>
			</Grid>
		</Container>
	)
}
export default page
