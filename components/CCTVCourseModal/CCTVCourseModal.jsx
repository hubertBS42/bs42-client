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
							<TabsTab value='description' leftSection={<IconNotes />}>
								Description
							</TabsTab>
							<TabsTab value='requirements' leftSection={<IconListCheck />}>
								Requirements
							</TabsTab>
							<TabsTab value='pricing' leftSection={<IconCalendarEvent />}>
								Schedule and Pricing
							</TabsTab>
						</TabsList>

						<TabsPanel value='description'>
							<Stack>
								<Text>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit.
									Dignissimos quibusdam molestias inventore mollitia
									perspiciatis architecto, ut, cupiditate recusandae dicta
									officiis nobis quae obcaecati natus repudiandae consectetur
									quod quam tenetur dolorem?
								</Text>
							</Stack>
						</TabsPanel>

						<TabsPanel value='requirements'>
							<List icon={<IconCheck size={18} stroke={3} />}>
								<ListItem>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
								</ListItem>
								<ListItem>
									Excepturi, adipisci odio vitae non culpa, amet distinctio
									quod
								</ListItem>
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
