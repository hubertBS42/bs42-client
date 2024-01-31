import {
	BackgroundImage,
	Box,
	Button,
	Container,
	Flex,
	Overlay,
	Stack,
	Text,
	Title,
} from '@mantine/core'
import classes from './page.module.scss'
import Link from 'next/link'
import Section from '@/components/Section/Section'
import cctvImage from '@/public/images/cctv-installation.jpg'
import Image from 'next/image'
import CCTVCourseModal from '@/components/CCTVCourseModal/CCTVCourseModal'
import DataCablingCourseModal from '@/components/DataCablingCourseModal/DataCablingCourseModal'

export const metadata = {
	title: 'Academy - BS42.NET',
}

const page = () => {
	return (
		<>
			<BackgroundImage
				src='/images/academy-banner.jpg'
				h={{ base: 380, sm: 560 }}
				w='100%'
				pos='relative'
			>
				<Overlay color='#000' opacity={0.5} />
				<Container
					size='xl'
					className={classes.bannerContainer}
					pt={{ base: 50, sm: 130 }}
				>
					<Stack className={classes.textWrapper}>
						<Title className={classes.title} order={1}>
							Welcome to BS42 Academy
						</Title>
						<Text className={classes.text}>
							Are you looking for a rewarding career in the security and
							networking industry? Learn how to install, maintain and
							troubleshoot CCTV and network systems with BS42 Academy.
						</Text>

						<Button
							component={Link}
							href='contact-us'
							className={classes.button}
							color='cRed.0'
							size='sm'
						>
							Contact Us
						</Button>
					</Stack>
				</Container>
			</BackgroundImage>

			<Section>
				<Stack
					ta='center'
					gap={5}
					mb={{ base: 30, sm: 50 }}
					className={classes.sectionTitle}
				>
					<Title order={2} className={classes.title}>
						We offer the following courses
					</Title>
					<Text c='gray' className={classes.text}>
						Building a betterworld, one course at a time
					</Text>
				</Stack>

				<Stack gap='lg'>
					<Flex className={classes.card}>
						<Box className={classes.imageWrapper}>
							<Image
								src='/images/cctv-installation.jpg'
								alt='cctv camera'
								className={classes.image}
								fill
							/>
						</Box>
						<Stack className={classes.textSection} align='flex-start'>
							<Title order={3} className={classes.title}>
								CCTV Installation
							</Title>
							<Text className={classes.text}>
								Our CCTV course will teach you everything you need to know
								about CCTV, from the basics of camera types and RJ45 crimping,
								to the advanced skills of network configuration and remote
								access. You will also learn how to comply with the relevant
								standards and regulations, as well as how to deal with
								customers and clients professionally.
							</Text>

							<CCTVCourseModal />
						</Stack>
					</Flex>

					<Flex className={classes.card}>
						<Box className={classes.imageWrapper}>
							<Image
								src='/images/data-cabling.jpg'
								alt='cctv camera'
								className={classes.image}
								fill
							/>
						</Box>
						<Stack className={classes.textSection} align='flex-start'>
							<Title order={3}>Data Cabling</Title>
							<Text className={classes.text}>
								Data cabling is the backbone of any network, whether its for
								home, office, or industrial use. The Data Cabling Course
								provides you with the skills and knowledge to become a
								certified data cabling and networking technician. It is
								designed for technicians who wish to install structured
								cabling in commercial and non-commercial buildings for high
								speed data network installations.
							</Text>

							<DataCablingCourseModal />
						</Stack>
					</Flex>
				</Stack>
			</Section>

			<Section></Section>
		</>
	)
}
export default page
