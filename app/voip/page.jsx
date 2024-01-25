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
	return (
		<>
			<BackgroundImage
				src='/images/voip-banner1.jpg'
				h={640}
				w='100%'
				pos='relative'
			>
				<Overlay color='#fff' opacity={0.5} />
				<Container size='xl' className={classes.container} pt={130}>
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
					<Flex align='flex-start' gap='md'>
						<Flex
							bg='cRed.0'
							c='white'
							p={10}
							style={{ borderRadius: '50%' }}
						>
							<IconPigMoney size={30} />
						</Flex>
						<Stack gap={5}>
							<Title order={2}>Cost Saving</Title>
							<Text>
								Our VoIP service allow businesses to make phone calls over the
								internet, with US and UK landline numbers from anywhere in the
								world at local rates.
							</Text>
						</Stack>
					</Flex>

					<Flex align='flex-start' gap='md'>
						<Flex
							bg='cRed.0'
							c='white'
							p={10}
							style={{ borderRadius: '50%' }}
						>
							<IconPhone size={30} />
						</Flex>
						<Stack gap={5}>
							<Title order={2}>Improved Communication</Title>
							<Text>
								With intercom systems, employees can communicate internally
								and externally across different branches and regions at zero
								extra cost.
							</Text>
						</Stack>
					</Flex>

					<Flex align='flex-start' gap='md'>
						<Flex
							bg='cRed.0'
							c='white'
							p={10}
							style={{ borderRadius: '50%' }}
						>
							<IconListCheck size={30} />
						</Flex>
						<Stack gap={5}>
							<Title order={2}>Amazing Features</Title>
							<Text>
								Enjoy features such as call forwarding, call recording, IVR
								menus, Call Centre, voicemail, conference calling as well as
								integration with other communication tools such as video
								conferencing and instant messaging.
							</Text>
						</Stack>
					</Flex>
				</SimpleGrid>
			</VoipSection>

			<VoipSection redBg>
				<SimpleGrid
					cols={{ base: 1, sm: 2 }}
					verticalSpacing={{ base: 'lg', sm: 'xl' }}
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
							<Title c='gray.1'>Our call, anytime, anywhere!</Title>
							{/* <Text fz={21} c='gray.1'>
								Lorem ipsum dolor sit amet
							</Text> */}
							<Divider w={70} size='sm' mt={5} color='gray.2' />
						</Stack>

						<Text fz={18} c='gray.2' maw={550}>
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
					// spacing={{ sm: 100 }}
				>
					<Stack pt={{ sm: 80 }} gap={30}>
						<Stack gap={5}>
							<Title>Everything you need in one place!</Title>
							{/* <Text fz={21} c='gray.8'>
								Lorem ipsum dolor sit amet
							</Text> */}
							<Divider w={70} size='sm' mt={5} color='cRed.0' />
						</Stack>

						<Text fz={18} c='gray.7' maw={550}>
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
				<Container size='xl' className={classes.container} pt={80}>
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
							defaultValue='item1'
							classNames={{
								root: classes.accordionRoot,
								control: classes.accordionControl,
								panel: classes.accordionPanel,
								item: classes.accordionItem,
							}}
						>
							<AccordionItem key={1} value='item1'>
								<AccordionControl>
									<Title order={4}>What is VoIP?</Title>
								</AccordionControl>
								<AccordionPanel>
									VoIP stands for Voice over Internet Protocol and it allows
									you to place telephone calls over a data network like the
									internet. It operates by converting your voice signal from
									your telephone into a digital signal that can then be
									transmitted over the Internet.
								</AccordionPanel>
							</AccordionItem>

							<AccordionItem key={2} value='item2'>
								<AccordionControl>
									<Title order={4}>What are the advantages of VoIP?</Title>
								</AccordionControl>
								<AccordionPanel>
									VoIP offers many benefits for businesses including lower
									costs, better accessibility, portability, higher scalability,
									and it can make working remotely much easier for workers and
									employees.
								</AccordionPanel>
							</AccordionItem>
							<AccordionItem key={3} value='item3'>
								<AccordionControl>
									<Title order={4}>Can I keep my phone number?</Title>
								</AccordionControl>
								<AccordionPanel>
									Yes, most providers allow number portability so you can use
									the same number you had with your traditional phone provider.
									Certain providers charge for this, so be sure to check with
									your provider. Also, you should be aware that number
									portability is not instant, and can take a few days.
								</AccordionPanel>
							</AccordionItem>
							<AccordionItem key={4} value='item4'>
								<AccordionControl>
									<Title order={4}>Does VoIP work without internet?</Title>
								</AccordionControl>
								<AccordionPanel>
									No, VoIP requires an internet connection to work properly.
									Without an internet connection, you cannot make VoIP calls.
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</Stack>
				</Container>
			</BackgroundImage>
		</>
	)
}
export default page
