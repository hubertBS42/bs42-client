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
import classes from './Footer.module.scss'

const Footer = () => {
	return (
		<Stack gap={0}>
			<Box className={classes.top}>
				<Container size='xl'>
					<Benefits />
					<BenefitsCarousel />
				</Container>
			</Box>
			<Box className={classes.middle}>
				<Container size='xl'>
					<Box className={classes.needHelp}>
						<Text fz={20} fw={600}>
							Need help? Call our award-winning support team at +233 24 8983
							272
						</Text>
					</Box>
					<Grid
						className={classes.footerMenu}
						gutter={{ base: 30, xl: 50 }}
						mx='auto'
						py='xl'
					>
						<Grid.Col
							span={{ sm: 12, md: 4 }}
							className={classes.left}
							ta={{ base: 'center', md: 'left' }}
						>
							<Title order={5} className={classes.footerHeading}>
								Subscribe to our newsletter
							</Title>
							<Stack gap={18}>
								<Text c='gray.3' fz={12}>
									Get the latest updates on new products and upcoming sales
								</Text>

								<TextInput
									radius='xl'
									size='md'
									mx={{ base: 'auto', md: 'unset' }}
									maw={400}
									w='100%'
									rightSection={
										<ActionIcon
											size={32}
											radius='xl'
											variant='filled'
											className={classes.emailInputBtn}
										>
											<IconArrowRight size='1.1rem' stroke={1.5} />
										</ActionIcon>
									}
									placeholder='Your email address'
									rightSectionWidth={42}
								/>

								<Group className={classes.socials}>
									<ActionIcon
										size='lg'
										radius='xl'
										variant='outline'
										color='gray.1'
									>
										<IconBrandTwitterFilled size='1em' />
									</ActionIcon>
									<ActionIcon
										size='lg'
										radius='xl'
										variant='outline'
										color='gray.1'
									>
										<IconBrandMeta size='1em' />
									</ActionIcon>
									<ActionIcon
										size='lg'
										radius='xl'
										variant='outline'
										color='gray.1'
									>
										<IconBrandInstagram size='1em' />
									</ActionIcon>
									<ActionIcon
										size='lg'
										radius='xl'
										variant='outline'
										color='gray.1'
									>
										<IconBrandYoutube size='1em' />
									</ActionIcon>
								</Group>
							</Stack>
						</Grid.Col>
						<Grid.Col span={{ sm: 4, md: 2 }} className={classes.middle}>
							<Title order={5} className={classes.footerHeading}>
								Shop
							</Title>
							<Stack gap={10} className={classes.footerNavLinks}>
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
						<Grid.Col span={{ sm: 4, md: 2 }}>
							<Title order={5} className={classes.footerHeading}>
								Information
							</Title>
							<Stack gap={10} className={classes.footerNavLinks}>
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
						<Grid.Col span={{ sm: 4, md: 4 }}>
							<Title order={5} className={classes.footerHeading}>
								Contact
							</Title>
							<Stack gap={10}>
								<Link href='#' className={classes.footerLink}>
									<IconMapPin stroke={1.7} size={16} />
									Tycan House, House NO. 43 <br />
									Tetteh Okuley Ave <br /> Abofu - Achimota
								</Link>

								<Link href='#' className={classes.footerLink}>
									<IconPhoneCall stroke={1.7} size={16} />
									+233 26 1989 626
								</Link>

								{/* <Box
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
								</Box> */}

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
				<Text align='center' fz={12}>
					© 2023 Online Shop. All Rights Reserved.
				</Text>
			</Box>
		</Stack>
	)
}
export default Footer
