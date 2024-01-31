import {
	Accordion,
	AccordionControl,
	AccordionItem,
	AccordionPanel,
	BackgroundImage,
	Box,
	Button,
	Container,
	Divider,
	Flex,
	Overlay,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core'
import classes from './page.module.scss'
import bannerPic from '@/public/images/voip-banner1.jpg'
import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/Section/Section'
import {
	IconListCheck,
	IconPhone,
	IconPhoneCheck,
	IconPigMoney,
} from '@tabler/icons-react'
import image2 from '@/public/images/calling-2.jpg'
import image3 from '@/public/images/phones1.png'
import VoipSection from '@/components/VoipSection/VoipSection'

export const metadata = {
	title: 'VoIP - BS42.NET',
}

const page = () => {
	const benefits = [
		{
			icon: <IconPigMoney className={classes.benefitIcon} />,
			title: 'Cost Saving',
			text:
				'Our VoIP service allow businesses to make phone calls over the internet, with US and UK landline numbers from anywhere in the	world at local rates.',
		},
		{
			icon: <IconPhone className={classes.benefitIcon} />,
			title: 'Improved Communication',
			text:
				'With intercom systems, employees can communicate internally and externally across different branches and regions at zero	extra cost.',
		},
		{
			icon: <IconListCheck className={classes.benefitIcon} />,
			title: 'Amazing Features',
			text:
				'Enjoy features such as call forwarding, call recording, IVR menus, Call Centre, voicemail, conference calling as well as	integration with other communication tools such as video conferencing and instant messaging',
		},
	]

	const FAQs = [
		{
			title: 'What is VoIP?',
			text:
				'VoIP stands for Voice over Internet Protocol and it allows you to place telephone calls over a data network like the internet. It operates by converting your voice signal from	your telephone into a digital signal that can then be	transmitted over the Internet.',
		},
		{
			title: 'What are the advantages of VoIP?',
			text:
				'VoIP offers many benefits for businesses including lower	costs, better accessibility, portability, higher scalability,	and it can make working remotely much easier for workers and employees.',
		},
		{
			title: 'Can I keep my phone number?',
			text:
				'Yes, most providers allow number portability so you can use the same number you had with your traditional phone provider. Certain providers charge for this, so be sure to check with your provider. Also, you should be aware that number portability is not instant, and can take a few days.',
		},
		{
			title: 'Does VoIP work without internet?',
			text:
				'No, VoIP requires an internet connection to work properly.	Without an internet connection, you cannot make VoIP calls.',
		},
	]

	const renderBenefits = benefits.map(benefit => (
		<Flex align='flex-start' gap='md' key={benefit.title}>
			<Flex
				bg='cRed.0'
				c='white'
				p={10}
				className={classes.benefitIconWrapper}
			>
				{benefit.icon}
			</Flex>
			<Stack gap={5}>
				<Title order={2} className={classes.benefitTitle}>
					{benefit.title}
				</Title>
				<Text className={classes.benefitText}>{benefit.text}</Text>
			</Stack>
		</Flex>
	))

	const renderFAQs = FAQs.map((faq, i) => (
		<AccordionItem key={i} value={faq.title}>
			<AccordionControl>
				<Title order={4} fz={{ base: 15, sm: 16 }}>
					{faq.title}
				</Title>
			</AccordionControl>
			<AccordionPanel>{faq.text}</AccordionPanel>
		</AccordionItem>
	))

	return (
		<>
			<BackgroundImage
				src='/images/voip-banner1.jpg'
				h={{ base: 400, sm: 640 }}
				w='100%'
				pos='relative'
			>
				<Overlay color='#000' opacity={0.5} />
				<Container
					size='xl'
					className={classes.container}
					pt={{ base: 30, sm: 130 }}
				>
					<Stack className={classes.textWrapper}>
						<Title className={classes.title} order={1}>
							Communicate without boundaries on VoIP
						</Title>
						<Text className={classes.text}>
							We specialize in providing VOIP and intercom systems for both
							multibranched and unbranched businesses. Our solutions are
							designed to help businesses communicate seamlessly.
						</Text>

						<Button
							component={Link}
							href='products?category=voip'
							className={classes.button}
							color='cRed.0'
							size='sm'
						>
							Shop now
						</Button>
					</Stack>
				</Container>
			</BackgroundImage>

			<VoipSection>
				<SimpleGrid
					cols={{ base: 1, sm: 2, md: 3 }}
					verticalSpacing={{ base: 'lg', sm: 'xl' }}
				>
					{renderBenefits}
				</SimpleGrid>
			</VoipSection>

			<VoipSection redBg>
				<SimpleGrid
					cols={{ base: 1, sm: 2 }}
					verticalSpacing={{ base: 'lg', sm: 'xl' }}
					className={classes.section3}
					// spacing={{ sm: 100 }}
				>
					<Box>
						<Image
							src={image3}
							alt='image of phones'
							style={{
								width: '100%',
								height: 'auto',
							}}
						/>
					</Box>

					<Stack gap={30} ml={{ sm: 80 }}>
						<Stack gap={5}>
							<Title c='gray.1' className={classes.title}>
								Our call, anytime, anywhere!
							</Title>
							<Divider w={70} size='sm' mt={5} color='gray.2' />
						</Stack>

						<Text fz={18} c='gray.2' maw={550} className={classes.text}>
							In today&apos;s fast-paced business environment, communication
							is key. Whether you need a simple intercom system for a small
							office, or a complex VOIP system for a multinational
							corporation. we offer expert advice and after sales support.
						</Text>
					</Stack>
				</SimpleGrid>
			</VoipSection>

			<VoipSection>
				<SimpleGrid
					cols={{ base: 1, sm: 2 }}
					verticalSpacing={{ base: 'lg', sm: 'xl' }}
					className={classes.section4}
					// spacing={{ sm: 100 }}
				>
					<Stack pt={{ sm: 80 }} gap={30}>
						<Stack gap={5}>
							<Title className={classes.title}>
								Everything you need in one place!
							</Title>
							{/* <Text fz={21} c='gray.8'>
								Lorem ipsum dolor sit amet
							</Text> */}
							<Divider w={70} size='sm' mt={5} color='cRed.0' />
						</Stack>

						<Text fz={18} c='gray.7' maw={550} className={classes.text}>
							We have years of experience in installing, maintaining, and
							troubleshooting these systems. We offer competitive prices and
							flexible plans. Contact us today to get a free consultation
							with our experts and quote.
						</Text>
					</Stack>

					<Box>
						<Image
							src={image2}
							alt='men talking on phone'
							style={{ width: '100%', height: 'auto' }}
						/>
					</Box>
				</SimpleGrid>
			</VoipSection>

			<BackgroundImage
				src='/images/Q&A.jpg'
				h={600}
				w='100%'
				pos='relative'
			>
				{/* <Overlay color='#fff' opacity={0.5} /> */}
				<Container
					size='xl'
					className={classes.container}
					pt={{ base: 50, sm: 80 }}
				>
					<Stack
						className={classes.textWrapper}
						style={{ maxWidth: 650 }}
						gap='xl'
					>
						<Stack gap={5}>
							<Title className={classes.title} order={1}>
								You’ve got questions, we’ve got answers.
							</Title>

							<Divider w={70} size='sm' mt={5} color='cRed.0' />
						</Stack>

						<Accordion
							defaultValue={FAQs[0].title}
							classNames={{
								root: classes.accordionRoot,
								control: classes.accordionControl,
								panel: classes.accordionPanel,
								item: classes.accordionItem,
							}}
						>
							{renderFAQs}
						</Accordion>
					</Stack>
				</Container>
			</BackgroundImage>
		</>
	)
}
export default page
