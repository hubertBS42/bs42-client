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
import { IconPigMoney } from '@tabler/icons-react'
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
							Lorem ipsum dolor sit amet consectetur.
						</Title>
						<Text className={classes.text}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
							placeat qui hic quisquam doloribus, blanditiis suscipit eaque
							natus.
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
					<Flex align='center' gap='md'>
						<Flex
							bg='cRed.0'
							c='white'
							p={5}
							style={{ borderRadius: '50%' }}
						>
							<IconPigMoney size={40} />
						</Flex>
						<Stack gap={5}>
							<Title order={2}>Lorem ipsum dolor</Title>
							<Text>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Ipsam sed nam voluptates magnam ex perferendis dicta.
							</Text>
						</Stack>
					</Flex>

					<Flex align='center' gap='md'>
						<Flex
							bg='cRed.0'
							c='white'
							p={5}
							style={{ borderRadius: '50%' }}
						>
							<IconPigMoney size={40} />
						</Flex>
						<Stack gap={5}>
							<Title order={2}>Lorem ipsum dolor</Title>
							<Text>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Ipsam sed nam voluptates magnam ex perferendis dicta.
							</Text>
						</Stack>
					</Flex>

					<Flex align='center' gap='md'>
						<Flex
							bg='cRed.0'
							c='white'
							p={5}
							style={{ borderRadius: '50%' }}
						>
							<IconPigMoney size={40} />
						</Flex>
						<Stack gap={5}>
							<Title order={2}>Lorem ipsum dolor</Title>
							<Text>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Ipsam sed nam voluptates magnam ex perferendis dicta.
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

					<Stack gap={38} ml={{ sm: 80 }}>
						<Stack gap={5}>
							<Title c='gray.1'>Our call, anytime, anywhere!</Title>
							<Text fz={21} c='gray.1'>
								Lorem ipsum dolor sit amet
							</Text>
							<Divider w={70} size='sm' mt={5} color='gray.2' />
						</Stack>

						<Text fz={18} c='gray.2' maw={550}>
							Get more value out of your phone. Simplify your business
							communications with a single product that does what you need,
							when you need it. Build better relationships with every
							customer.
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
					<Stack pt={{ sm: 80 }} gap={38}>
						<Stack gap={5}>
							<Title>Everything you need in one place!</Title>
							<Text fz={21} c='gray.8'>
								Lorem ipsum dolor sit amet
							</Text>
							<Divider w={70} size='sm' mt={5} color='cRed.0' />
						</Stack>

						<Text fz={18} c='gray.7' maw={550}>
							Get more value out of your phone. Simplify your business
							communications with a single product that does what you need,
							when you need it. Build better relationships with every
							customer.
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
								<AccordionControl>Question 1</AccordionControl>
								<AccordionPanel>item1</AccordionPanel>
							</AccordionItem>

							<AccordionItem key={2} value='item2'>
								<AccordionControl>Question 2</AccordionControl>
								<AccordionPanel>item2</AccordionPanel>
							</AccordionItem>
							<AccordionItem key={3} value='item3'>
								<AccordionControl>Question 3</AccordionControl>
								<AccordionPanel>item3</AccordionPanel>
							</AccordionItem>
							<AccordionItem key={4} value='item4'>
								<AccordionControl>Question 4</AccordionControl>
								<AccordionPanel>item4</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</Stack>
				</Container>
			</BackgroundImage>
		</>
	)
}
export default page
