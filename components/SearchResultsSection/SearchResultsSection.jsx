'use client'
import { Accordion, Stack } from '@mantine/core'
import ResultsProductCard from '../ResultsProductCard/ResultsProductCard'
import classes from './SearchResultsSection.module.scss'
import { groupProductsByTopLevelCategory } from '@/utils/functions'

const SearchResultsSection = ({
	results: products,
	categories,
	closeModal,
}) => {
	const groupedProducts = groupProductsByTopLevelCategory(
		products,
		categories
	)

	return (
		<Accordion defaultValue='group-0'>
			{groupedProducts.map((group, i) => (
				<Accordion.Item key={i} value={`group-${i}`}>
					<Accordion.Control className={classes.title}>
						{group.category} ({group.products.length})
					</Accordion.Control>
					<Accordion.Panel>
						<Stack spacing={0}>
							{group.products.map(product => (
								<ResultsProductCard
									key={product._id}
									product={product}
									closeModal={closeModal}
								/>
							))}
						</Stack>
					</Accordion.Panel>
				</Accordion.Item>
			))}
		</Accordion>
	)
}
export default SearchResultsSection
