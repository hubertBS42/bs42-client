import { Container, Flex, Stack, Title } from '@mantine/core'
import classes from './page.module.scss'
import BlogsShowcase from '@/components/BlogsShowcase/BlogsShowcase'
import FiltersPopOver from '@/components/FiltersPopOver/FiltersPopOver'

export const metadata = {
	title: 'Blogs - BS42.NET',
}

const BlogsPage = async () => {
	return (
		<Container size='xl' py='xl'>
			<Stack>
				<Flex justify='space-between' align='center'>
					<Title tt='uppercase' order={2}>
						Blogs
					</Title>

					<Flex align='center' gap='sm'>
						<FiltersPopOver />
					</Flex>
				</Flex>
				<BlogsShowcase />
			</Stack>
		</Container>
	)
}
export default BlogsPage
