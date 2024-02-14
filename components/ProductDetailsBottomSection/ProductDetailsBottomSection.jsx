'use client'
import {
	Accordion,
	Container,
	Flex,
	Grid,
	Tabs,
	TypographyStylesProvider,
} from '@mantine/core'
import classes from './ProductDetailsBottomSection.module.scss'
import Link from 'next/link'
import {
	IconBook2,
	IconPlus,
	IconShieldCheck,
	IconTruckReturn,
} from '@tabler/icons-react'

const ProductDetailsBottomSection = ({ data }) => {
	return (
		<Container
			size='xl'
			style={{ paddingTop: '3vw', paddingBottom: '3vw' }}
		>
			<Grid>
				<Grid.Col span={{ base: 12 }}>
					<Tabs
						defaultValue='description'
						classNames={{
							tab: classes.tab,
							tabLabel: classes.tabLabel,
							panel: classes.tabPanel,
						}}
					>
						<Tabs.List>
							<Tabs.Tab value='description'>Description</Tabs.Tab>
							<Tabs.Tab value='resources'>Resources</Tabs.Tab>
							<Tabs.Tab value='videos'>Videos</Tabs.Tab>
							<Tabs.Tab value='faq'>FAQ</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel value='description'>
							{/* <TypographyStylesProvider> */}
							<div
								dangerouslySetInnerHTML={{ __html: data.description }}
								className={classes.bodySection}
							/>
							{/* </TypographyStylesProvider> */}
						</Tabs.Panel>

						<Tabs.Panel value='resources'>
							<Flex className={classes.resources} gap={16}>
								{data.instructions && (
									<Link href=''>
										<IconBook2 className={classes.icon} color='#5fb139' />{' '}
										Instruction Manual
									</Link>
								)}

								{data.warranty && (
									<Link href=''>
										<IconShieldCheck className={classes.icon} color='#b156d4' />{' '}
										Warranty
									</Link>
								)}

								{data.shippingAndReturns && (
									<Link href=''>
										<IconTruckReturn className={classes.icon} color='#b20000' />{' '}
										Shipping & Returns
									</Link>
								)}
							</Flex>
						</Tabs.Panel>

						<Tabs.Panel value='videos'></Tabs.Panel>
						<Tabs.Panel value='faq'>
							<Accordion
								classNames={{ chevron: classes.chevron }}
								chevron={<IconPlus className={classes.icon} />}
								variant='contained'
							>
								{data.faqs.length > 0 &&
									data.faqs.map((faq, i) => (
										<Accordion.Item key={i} value={faq.question}>
											<Accordion.Control>{faq.question}</Accordion.Control>
											<Accordion.Panel>{faq.answer}</Accordion.Panel>
										</Accordion.Item>
									))}
							</Accordion>
						</Tabs.Panel>
					</Tabs>
				</Grid.Col>
			</Grid>
		</Container>
	)
}
export default ProductDetailsBottomSection
