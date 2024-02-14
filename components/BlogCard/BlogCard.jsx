'use client'
import { Card, Stack, Text, Title, Tooltip } from '@mantine/core'
import Image from 'next/image'
import classes from './BlogCard.module.scss'
import { formatDate } from '@/utils/functions'
import Link from 'next/link'

const BlogCard = ({ data }) => {
	return (
		<Card radius='sm'>
			<Link href={`/blog/${data?.slug}`}>
				<Card.Section className={classes.imgWrapper} mb={15}>
					<Image
						src={data.previewImage.url}
						sizes='(min-width: 1360px) 419px, (min-width: 680px) calc(30.15vw + 15px), 100vw'
						fill
						style={{ objectFit: 'cover' }}
						alt={data.title}
					/>
				</Card.Section>
			</Link>

			<Stack gap={14}>
				{/* <Title order={5} className={classes.blogTitle}>
					{data.title}
				</Title> */}
				<Tooltip
					label={data?.title}
					withinPortal
					style={{ fontSize: 11 }}
				>
					<Text
						lineClamp={1}
						className={classes.blogTitle}
						fz={{ base: '14px', xs: '18px' }}
						lh={{ base: '20px', xs: '22px' }}
						component={Link}
						href={`/blog/${data?.slug}`}
					>
						{data?.title}
					</Text>
				</Tooltip>
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
