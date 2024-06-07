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
import classes from './DataCablingCourseModal.module.scss'
import {
	IconCalendarEvent,
	IconCheck,
	IconListCheck,
	IconNotes,
} from '@tabler/icons-react'

const DataCablingCourseModal = () => {
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
						src='/images/data-cable-banner.jpg'
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
									Data Cabling
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
									Data cabling technicians are responsible for installing,
									maintaining, and troubleshooting data cables that carry
									voice, data, and video signals. When you take the Data
									Cabling course, you will learn how to work with different
									types of cables, such as Category 5, 6, 7 and coaxial.
								</Text>

								<Text>
									You will also learn how to follow industry standards and best
									practices for data cabling installation and testing.
								</Text>

								<Text>
									You will gain hands-on experience with real-world scenarios
									and equipment, under the guidance of our experienced
									instructors. Whether you are looking for a new career or want
									to upgrade your existing skills, the Data Cabling course can
									help you achieve your goals.
								</Text>

								<Text>
									Enrol today and start your journey to becoming a data cabling
									professional. Upon completing our course, you will gain a
									certification that will open up many opportunities for you
									and give you access to our reseller program which will enable
									you purchase any item from us at a reseller price.
								</Text>

								<Text>Items to be given to participants after course;</Text>

								<List>
									<List.Item>Crimping tool</List.Item>
									<List.Item>30 pcs RJ45</List.Item>
									<List.Item>Analogue CCTV camera</List.Item>
									<List.Item>BNC connectors</List.Item>
									<List.Item>Cable tester</List.Item>
									<List.Item>CCTV video balun</List.Item>
									<List.Item>Male and female power connector jack</List.Item>
								</List>
							</Stack>
						</TabsPanel>

						<TabsPanel value='requirements'>
							<List icon={<IconCheck size={18} stroke={3} />}>
								<ListItem>Basic eduction</ListItem>
								<ListItem>Ability to read and write in english</ListItem>
								<ListItem>Basic electrical knowledge</ListItem>
								<ListItem>18 years above</ListItem>
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
										<TableTd>3 days</TableTd>
										<TableTd>2 days</TableTd>
									</TableTr>

									<TableTr>
										<TableTh>Training Days</TableTh>
										<TableTd>Wednesday, Thursday, Friday</TableTd>
										<TableTd>Saturday, Sunday</TableTd>
									</TableTr>

									<TableTr>
										<TableTh>Minimum Hours per week</TableTh>
										<TableTd>6 hours</TableTd>
										<TableTd>6 hours</TableTd>
									</TableTr>

									<TableTr>
										<TableTh>Pricing</TableTh>
										<TableTd>GHS 400.00</TableTd>
										<TableTd>GHS 400.00</TableTd>
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
export default DataCablingCourseModal
