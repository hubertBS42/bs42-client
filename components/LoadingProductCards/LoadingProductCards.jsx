'use client'
import {
	Button,
	Card,
	Rating,
	SimpleGrid,
	Skeleton,
	Stack,
	Text,
	Title,
} from '@mantine/core'
import classes from './LoadingProductCards.module.scss'

const LoadingProductCards = () => {
	const indices = []

	for (let i = 0; i < 12; i++) {
		indices.push(i)
	}

	return (
		<SimpleGrid
			cols={{ base: 2, sm: 3, md: 4 }}
			spacing={{ base: 'sm', sm: 'sm', md: 'md' }}
		>
			{indices.map(index => (
				<Skeleton visible={true} key={index}>
					<Card padding={0} radius='sm'>
						<Card.Section
							className={classes.imgWrapper}
							h={{ base: '100px', xs: '200px' }}
						></Card.Section>

						<Stack gap={0} justify='center'>
							<Title
								order={4}
								className={classes.brand}
								mb={5}
								fz={{ base: '11px', xs: '12px' }}
							>
								Placeholder
							</Title>

							<Text
								lineClamp={1}
								className={classes.productTitle}
								mb={6}
								fz={{ base: '11px', xs: '12px' }}
								lh={{ base: '20px', xs: '22px' }}
							>
								Placeholder
							</Text>

							<Rating value={0} fractions={2} readOnly size='xs' mb={5} />

							<Text className={classes.productPrice} mb={10}>
								Placeholder
							</Text>
							<Button
								size='md'
								variant='outline'
								color='gray.5'
								className={classes.addToCartBtn}
							>
								Placeholder
							</Button>
						</Stack>
					</Card>
				</Skeleton>
			))}
		</SimpleGrid>
	)
}
export default LoadingProductCards
