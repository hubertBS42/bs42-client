'use client'
import {
	ActionIcon,
	Box,
	Container,
	Grid,
	Group,
	Stack,
	Text,
	TextInput,
	Title,
	createStyles,
} from '@mantine/core'
import BenefitsCarousel from '../BenefitsCarousel/BenefitsCarousel'
import Benefits from '../Benefits/Benefits'
import { arimo, rajdhani } from '@/utils/font'
import Link from 'next/link'
import {
	IconArrowRight,
	IconBrandInstagram,
	IconBrandMeta,
	IconBrandTwitterFilled,
	IconBrandYoutube,
	IconMail,
	IconMapPin,
	IconPhoneCall,
} from '@tabler/icons-react'

const useStyles = createStyles(theme => ({
	top: {
		background: theme.colors.cRed[0],
		paddingTop: theme.spacing.sm,
		paddingBottom: theme.spacing.sm,
	},
	middle: {
		background: theme.colors.dark[6],
	},
	needHelp: {
		paddingTop: theme.spacing.md,
		paddingBottom: theme.spacing.md,
		borderBottom: `1px solid ${theme.colors.gray[8]}`,
	},
	footerMenu: {
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
	},
	footerHeading: {
		color: 'white',
		textTransform: 'uppercase',
		marginBottom: theme.spacing.md,
	},
	footerLink: {
		display: 'flex',
		columnGap: 7,
		alignItems: 'flex-start',
		color: theme.colors.gray[3],
		transition: 'ease-in .3s all',

		'&:hover': {
			color: 'white',
		},
	},
	copyright: {
		background: theme.colors.dark[4],
		fontSize: 12,
		color: 'white',
		paddingTop: theme.spacing.sm,
		paddingBottom: theme.spacing.sm,
	},
}))

const Footer = () => {
	const { classes } = useStyles()
	return (
		<Stack spacing={0}>
			<Box className={classes.top}>
				<Container size='xl'>
					<Benefits />
					<BenefitsCarousel />
				</Container>
			</Box>
			<Box className={classes.middle}>
				<Container size='xl'>
					<Box className={classes.needHelp}>
						<Text
							c='white'
							fz={20}
							fw={600}
							align='center'
							ff={rajdhani.style.fontFamily}
						>
							Need help? Call our award-winning support team at +233 24 8983
							272
						</Text>
					</Box>
					<Grid className={classes.footerMenu} gutterMd={30} gutterXl={50}>
						<Grid.Col
							sm={12}
							md={4}
							sx={theme => ({
								[theme.fn.smallerThan('md')]: {
									textAlign: 'center',
								},
							})}
						>
							<Title order={5} className={classes.footerHeading}>
								Subscribe to our newsletter
							</Title>
							<Stack>
								<Text c='gray.3' fz={12}>
									Get the latest updates on new products and upcoming sales
								</Text>

								<TextInput
									radius='xl'
									size='md'
									sx={theme => ({
										'.mantine-TextInput-input': {
											fontSize: 15,
										},
										[theme.fn.smallerThan('md')]: {
											marginLeft: 'auto',
											marginRight: 'auto',
											width: '100%',
											maxWidth: 400,
										},
									})}
									rightSection={
										<ActionIcon
											size={32}
											radius='xl'
											color='cRed.0'
											variant='filled'
										>
											<IconArrowRight size='1.1rem' stroke={1.5} />
										</ActionIcon>
									}
									placeholder='Your email address'
									rightSectionWidth={42}
								/>

								<Group
									sx={theme => ({
										[theme.fn.smallerThan('md')]: {
											justifyContent: 'center',
										},
									})}
								>
									<ActionIcon
										size='lg'
										radius='xl'
										variant='outline'
										sx={{ color: 'white' }}
									>
										<IconBrandTwitterFilled size='1em' />
									</ActionIcon>
									<ActionIcon
										size='lg'
										radius='xl'
										variant='outline'
										sx={{ color: 'white' }}
									>
										<IconBrandMeta size='1em' />
									</ActionIcon>
									<ActionIcon
										size='lg'
										radius='xl'
										variant='outline'
										sx={{ color: 'white' }}
									>
										<IconBrandInstagram size='1em' />
									</ActionIcon>
									<ActionIcon
										size='lg'
										radius='xl'
										variant='outline'
										sx={{ color: 'white' }}
									>
										<IconBrandYoutube size='1em' />
									</ActionIcon>
								</Group>
							</Stack>
						</Grid.Col>
						<Grid.Col sm={4} md={2}>
							<Title order={5} className={classes.footerHeading}>
								Shop
							</Title>
							<Stack
								sx={theme => ({
									fontFamily: arimo.style.fontFamily,
									fontSize: 12,
									color: theme.colors.gray[3],
									transition: 'ease-in .3s all',

									'& a:hover': {
										color: 'white',
									},
								})}
								spacing={10}
							>
								<Link href='#' className='animated-link'>
									Computers
								</Link>
								<Link href='#' className='animated-link'>
									Network Computers
								</Link>
								<Link href='#' className='animated-link'>
									Network Cabinets
								</Link>
							</Stack>
						</Grid.Col>
						<Grid.Col sm={4} md={2}>
							<Title order={5} className={classes.footerHeading}>
								Information
							</Title>
							<Stack
								sx={theme => ({
									fontFamily: arimo.style.fontFamily,
									fontSize: 12,
									color: theme.colors.gray[3],
									transition: 'ease-in .3s all',

									'& a:hover': {
										color: 'white',
									},
								})}
								spacing={10}
							>
								<Link href='#' className='animated-link'>
									Computers
								</Link>
								<Link href='#' className='animated-link'>
									Network Computers
								</Link>
								<Link href='#' className='animated-link'>
									Network Cabinets
								</Link>
							</Stack>
						</Grid.Col>
						<Grid.Col sm={4} md={4}>
							<Title order={5} className={classes.footerHeading}>
								Contact
							</Title>
							<Stack
								sx={{
									fontFamily: arimo.style.fontFamily,
									fontSize: 12,
									color: 'white',
								}}
								spacing={13}
							>
								<Link href='#' className={classes.footerLink}>
									<IconMapPin stroke={1.7} size={16} />
									Tycan House, House NO. 43 <br />
									Tetteh Okuley Ave <br /> Abofu - Achimota
								</Link>

								<Link href='#' className={classes.footerLink}>
									<IconPhoneCall stroke={1.7} size={16} />
									+233 26 1989 626
								</Link>

								<Box
									component={Link}
									href='#'
									className={classes.footerLink}
									td='underline'
									tt='uppercase'
									fz={15}
									fw={700}
									pl='xl'
								>
									Ask an expert
								</Box>

								<Link href='#' className={classes.footerLink}>
									<IconMail stroke={1.7} size={16} />
									support@bs42.net
								</Link>
							</Stack>
						</Grid.Col>
					</Grid>
				</Container>
			</Box>
			<Box className={classes.copyright}>
				<Text align='center'>
					© 2023 Online Shop. All Rights Reserved.
				</Text>
			</Box>
		</Stack>
	)
}
export default Footer
