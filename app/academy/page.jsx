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

const page = () => {
	return (
		<>
			<BackgroundImage
				src='/images/academy-banner.jpg'
				h={{ base: 400, sm: 560 }}
				w='100%'
				pos='relative'
			>
				<Overlay color='#000' opacity={0.5} />
				<Container
					size='xl'
					className={classes.bannerContainer}
					pt={{ base: 80, sm: 130 }}
				>
					<Stack className={classes.textWrapper}>
						<Title className={classes.title} order={1}>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
						</Title>
						<Text className={classes.text}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Similique quos, illum sunt inventore doloribus repudiandae
							quisquam.
						</Text>

						<Button
							component={Link}
							href='contact-us'
							className={classes.button}
							color='cRed.0'
							size='md'
						>
							Contact Us
						</Button>
					</Stack>
				</Container>
			</BackgroundImage>

			<Section>
				<Stack ta='center' gap={5} mb={{ base: 30, sm: 50 }}>
					<Title order={2} fz={30}>
						We offer the following courses
					</Title>
					<Text c='gray'>
						Building a betterworld, one course at a time
					</Text>
				</Stack>

				<Stack gap='xl'>
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
							<Title order={3}>CCTV Installation</Title>
							<Text>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Tenetur ullam culpa perspiciatis dignissimos neque? Dolores
								veniam, tempora incidunt ratione vero dolorum, officia rerum,
								ab eveniet excepturi voluptatum minima soluta beatae!
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
							<Text>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Tenetur ullam culpa perspiciatis dignissimos neque? Dolores
								veniam, tempora incidunt ratione vero dolorum, officia rerum,
								ab eveniet excepturi voluptatum minima soluta beatae!
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
