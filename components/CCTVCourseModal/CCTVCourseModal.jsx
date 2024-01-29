'use client'
import {
	BackgroundImage,
	Box,
	Button,
	Container,
	Flex,
	List,
	ListItem,
	Modal,
	Overlay,
	Stack,
	Table,
	TableTbody,
	TableTd,
	TableTh,
	TableThead,
	TableTr,
	Tabs,
	TabsList,
	TabsPanel,
	TabsTab,
	Text,
	Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './CCTVCourseModal.module.scss'
import {
	IconCalendarEvent,
	IconCheck,
	IconListCheck,
	IconNotes,
} from '@tabler/icons-react'

const CCTVCourseModal = () => {
	const [opened, { open, close }] = useDisclosure(false)

	const tabs = [
		{ label: 'Description', value: 'description', icon: <IconNotes /> },
		{
			label: 'Requirements',
			value: 'requirements',
			icon: <IconListCheck />,
		},
		{
			label: 'Schedule and Pricing',
			value: 'pricing',
			icon: <IconCalendarEvent />,
		},
	]
	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				size='100%'
				withCloseButton={false}
			>
				<Stack gap='lg'>
					<BackgroundImage
						src='/images/cctv-modal-banner.jpg'
						h={{ base: 200, sm: 300 }}
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
									CCTV Installation
								</Title>
							</Stack>
						</Container>
					</BackgroundImage>

					{/* <Stack gap='xl'>
						<Stack gap={5}>
							<Title order={3}>Description</Title>
							<Text>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit.
								Veritatis, ipsum consectetur. Molestias dolor aut sint cum ex
								sit ut error eligendi? Provident, explicabo nulla quasi harum
								veritatis perferendis perspiciatis corporis.
							</Text>
						</Stack>

						<Stack gap={5}>
							<Title order={3}>Requirements</Title>
							<List>
								<ListItem>Clone or download repository from GitHub</ListItem>
								<ListItem>Install dependencies with yarn</ListItem>
								<ListItem>
									To start development server run npm start command
								</ListItem>
								<ListItem>
									Run tests to make sure your changes do not break the build
								</ListItem>
								<ListItem>Submit a pull request once you are done</ListItem>
							</List>
						</Stack>

						<Stack gap={5}>
							<Title order={3}>Duration and Price</Title>
							<List>
								<ListItem>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
								</ListItem>
								<ListItem>
									Excepturi, adipisci odio vitae non culpa, amet distinctio
									quod
								</ListItem>
							</List>
						</Stack>
					</Stack> */}

					<Tabs
						defaultValue='description'
						variant='pills'
						color='cRed.0'
						classNames={{
							panel: classes.tabsPanel,
							tabLabel: classes.tabLabel,
						}}
					>
						<TabsList grow>
							{tabs.map(tab => (
								<TabsTab
									key={tab.value}
									value={tab.value}
									leftSection={tab.icon}
								>
									{tab.label}
								</TabsTab>
							))}
						</TabsList>

						<TabsPanel value='description'>
							<Stack>
								<Text>
									The basic course equips participants with fundamental skills
									in CCTV system setup and maintenance, covering key aspects
									such as site safety and proper tool usage, practical camera
									placement, RJ45 crimping, setting up recording devices,
									system maintenance, troubleshooting and a lot more.
								</Text>

								<Text>
									Our Advanced course is your gateway to advanced surveillance
									skills, ensuring you&apos;re well-equipped to tackle complex
									challenges in the evolving field of surveillance technology.
									Master essential skills like advanced network setups for
									seamless remote access, cloud and alarm integration, disaster
									recovery, VPN setup and many more.
								</Text>

								<Text>
									Upon completion of the course, you will gain a certification
									that will open many opportunities for you in the security
									sector. You will also benefit from our reseller program which
									will enable you purchase any item from us at a reseller
									price.
								</Text>

								<Text>
									Don&apos;t miss this chance to enrol in our CCTV installer
									course today. Contact us now to find out more and secure your
									place.
								</Text>
							</Stack>
						</TabsPanel>

						<TabsPanel value='requirements'>
							<List icon={<IconCheck size={18} stroke={3} />}>
								<ListItem>Basic education</ListItem>
								<ListItem>Ability to read and write in English</ListItem>
								<ListItem>Basic electrical knowledge</ListItem>
								<ListItem>18 years and above</ListItem>
							</List>
						</TabsPanel>

						<TabsPanel value='pricing'>
							<Table>
								<TableThead>
									<TableTr>
										<TableTh>Track</TableTh>
										<TableTh>Regular classes</TableTh>
										<TableTh>Weekend classes</TableTh>
									</TableTr>
								</TableThead>
								<TableTbody>
									<TableTr>
										<TableTh>Duration</TableTh>
										<TableTd>6 months</TableTd>
										<TableTd>6 months</TableTd>
									</TableTr>

									<TableTr>
										<TableTh>Training Days</TableTh>
										<TableTd>4 days per week</TableTd>
										<TableTd>Saturdays</TableTd>
									</TableTr>

									<TableTr>
										<TableTh>Minimum Hours per week</TableTh>
										<TableTd>8 hours</TableTd>
										<TableTd>8 hours</TableTd>
									</TableTr>

									<TableTr>
										<TableTh>Pricing</TableTh>
										<TableTd>
											<Stack gap={5}>
												<Flex gap={5}>
													<Box fw={700}>Basic:</Box> USD 0.00
												</Flex>
												<Flex gap={5}>
													<Box fw={700}>Advanced:</Box> USD 0.00
												</Flex>
											</Stack>
										</TableTd>
										<TableTd>
											<Stack gap={5}>
												<Flex gap={5}>
													<Box fw={700}>Basic:</Box> USD 0.00
												</Flex>
												<Flex gap={5}>
													<Box fw={700}>Advanced:</Box> USD 0.00
												</Flex>
											</Stack>
										</TableTd>
									</TableTr>
								</TableTbody>
							</Table>
						</TabsPanel>
					</Tabs>
				</Stack>
			</Modal>
			<Button onClick={open} className='viewMoreBtn'>
				Read More
			</Button>
		</>
	)
}
export default CCTVCourseModal
