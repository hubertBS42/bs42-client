'use client'
import { Accordion, Stack } from '@mantine/core'
import ResultsProductCard from '../ResultsProductCard/ResultsProductCard'
import ResultsCard from '../ResultsCard/ResultsCard'
import classes from './SearchResultsSection.module.scss'

const SearchResultsSection = () => {
	return (
		<Accordion defaultValue='products'>
			<Accordion.Item value='products'>
				<Accordion.Control className={classes.title}>
					Found 4 Products
				</Accordion.Control>
				<Accordion.Panel>
					<Stack spacing={0}>
						<ResultsProductCard />
						<ResultsProductCard />
						<ResultsProductCard />
					</Stack>
				</Accordion.Panel>
			</Accordion.Item>

			<Accordion.Item value='categories'>
				<Accordion.Control className={classes.title}>
					Found 4 Categories
				</Accordion.Control>
				<Accordion.Panel>
					<Stack spacing={0}>
						<ResultsCard />
						<ResultsCard />
						<ResultsCard />
					</Stack>
				</Accordion.Panel>
			</Accordion.Item>

			<Accordion.Item value='brands'>
				<Accordion.Control className={classes.title}>
					Found 4 Brands
				</Accordion.Control>
				<Accordion.Panel>
					<ResultsCard />
					<ResultsCard />
					<ResultsCard />
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	)
}
export default SearchResultsSection
