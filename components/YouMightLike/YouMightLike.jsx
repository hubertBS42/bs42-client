'use client'
import { Box, Button, Divider, Flex, SimpleGrid } from '@mantine/core'
import Section from '../Section/Section'
import ProductCard from '../ProductCard/ProductCard'
import { useSelector } from 'react-redux'
import { selectAllProducts } from '@/redux/features/products/productsSlice'
import classes from './YouMightLike.module.scss'

const YouMightLike = () => {
	const products = useSelector(selectAllProducts)
	const copy = [...products].sort(
		(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
	)
	const oldest10Products = copy.slice(0, 10)

	return (
		<Section grayBg>
			<Box>
				<Divider
					mb={30}
					label='You may also like'
					labelPosition='center'
					classNames={{
						label: classes.label,
					}}
				/>

				<SimpleGrid
					cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
					spacing={{ base: 'sm', sm: 'sm', md: 'md' }}
				>
					{oldest10Products.map(product => (
						<ProductCard key={product._id} border product={product} />
					))}
				</SimpleGrid>
				<Flex justify='center' mt={40}>
					<Button className='viewMoreBtn'>View more</Button>
				</Flex>
			</Box>
		</Section>
	)
}
export default YouMightLike
