'use client'
import { Accordion, Container, Flex, Grid, Tabs } from '@mantine/core'
import classes from './ProductDetailsBottomSection.module.scss'
import Link from 'next/link'
import {
	IconBook2,
	IconPlus,
	IconShieldCheck,
	IconTruckReturn,
} from '@tabler/icons-react'

const ProductDetailsBottomSection = ({ product }) => {
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
							<div
								dangerouslySetInnerHTML={{ __html: product.description }}
								className={classes.bodySection}
							/>
						</Tabs.Panel>

						<Tabs.Panel value='resources'>
							<Flex className={classes.resources} gap={16}>
								{product.instructions && (
									<Link href=''>
										<IconBook2 className={classes.icon} color='#5fb139' />{' '}
										Instruction Manual
									</Link>
								)}

								{product.warranty && (
									<Link href=''>
										<IconShieldCheck className={classes.icon} color='#b156d4' />{' '}
										Warranty
									</Link>
								)}

								{product.shippingAndReturns && (
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
								{product.faqs.length > 0 &&
									product.faqs.map((faq, i) => (
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
