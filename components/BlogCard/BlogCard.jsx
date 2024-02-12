'use client'
import { Card, Stack, Text, Title } from '@mantine/core'
import Image from 'next/image'
import classes from './BlogCard.module.scss'
import { formatDate } from '@/utils/functions'

const BlogCard = ({ data }) => {
	return (
		<Card radius='sm'>
			<Card.Section className={classes.imgWrapper} mb={15}>
				<Image
					src={data.previewImage.url}
					sizes='(min-width: 1360px) 419px, (min-width: 680px) calc(30.15vw + 15px), 100vw'
					fill
					style={{ objectFit: 'cover' }}
					alt={data.title}
				/>
			</Card.Section>

			<Stack gap={15} justify='center'>
				<Title order={5} className={classes.blogTitle}>
					{data.title}
				</Title>
				<Title order={3} className={classes.metadata}>
					Posted by{' '}
					{data.author.lastName
						? data.author.firstName + ' ' + data.author.lastName
						: data.author.firstName}{' '}
					on {formatDate(data.createdAt)}
				</Title>
				<Text lineClamp={3} className={classes.text}>
					{data.excerpt}
				</Text>
			</Stack>
		</Card>
	)
}
export default BlogCard
