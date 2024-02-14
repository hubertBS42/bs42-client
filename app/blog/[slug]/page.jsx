import {
	BackgroundImage,
	Container,
	Flex,
	Overlay,
	Stack,
	Text,
	Title,
	TypographyStylesProvider,
} from '@mantine/core'
import classes from './page.module.scss'
import Section from '@/components/Section/Section'
import { fetcher, formatDate } from '@/utils/functions'

const page = async ({ params: { slug } }) => {
	const { data } = await fetcher(
		`https://portal.bs42.net/api/frontend/blogs/${slug}`,
		{ cache: 'no-store' }
	)

	return (
		<>
			<Container size='xl' className={classes.bannerContainer}>
				<BackgroundImage
					src={data.bannerImage.url}
					h={{ base: 200, sm: 400 }}
					w='100%'
					pos='relative'
					radius='md'
					style={{ overflow: 'hidden' }}
				>
					<Overlay color='#000' opacity={0.5} />
					<Stack className={classes.textWrapper}>
						<Title className={classes.title} order={1}>
							{data.title}
						</Title>
						<Text className={classes.text}>
							Posted by{' '}
							{data.author.lastName
								? data.author.firstName + ' ' + data.author.lastName
								: data.author.firstName}{' '}
							on {formatDate(data.createdAt)}
						</Text>
					</Stack>
				</BackgroundImage>
			</Container>

			<Section>
				{/* <TypographyStylesProvider> */}
				<div
					dangerouslySetInnerHTML={{ __html: data.body }}
					className={classes.bodySection}
				/>
				{/* </TypographyStylesProvider> */}
			</Section>
		</>
	)
}
export default page
