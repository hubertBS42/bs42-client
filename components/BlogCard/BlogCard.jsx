'use client'
import { Card, Stack, Text, Title } from '@mantine/core'
import Image from 'next/image'
import classes from './BlogCard.module.scss'

const BlogCard = () => {
	return (
		<Card radius='sm'>
			<Card.Section className={classes.imgWrapper} mb={15}>
				<Image
					src='/images/blog1.webp'
					sizes='(min-width: 1360px) 419px, (min-width: 680px) calc(30.15vw + 15px), 100vw'
					fill
					style={{ objectFit: 'cover' }}
					alt='Norway'
				/>
			</Card.Section>

			<Stack gap={15} justify='center'>
				<Title order={5} className={classes.blogTitle}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</Title>
				<Title order={3} className={classes.metadata}>
					Posted by Hubert on 24th March 2023
				</Title>
				<Text lineClamp={3} className={classes.text}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Voluptates alias veniam iure, earum quas atque unde assumenda
					iusto eaque nihil, dolorem reprehenderit. Nulla, nobis? Itaque
					unde explicabo aut aliquam repudiandae.
				</Text>
			</Stack>
		</Card>
	)
}
export default BlogCard
