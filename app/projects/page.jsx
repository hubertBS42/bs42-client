import {
	Container,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { getProjects } from '@/utils/functions'

export const metadata = {
	title: 'Our Projects - BS42.NET',
}

const page = async () => {
	const projects = await getProjects()
	return (
		<Container py='xl' size='xl'>
			<Stack ta='center' gap='sm' mb={50}>
				<Title tt='uppercase' order={2}>
					Our Projects
				</Title>

				<Text c='gray' fz={14} maw={550} mx='auto'>
					Welcome to our Project Gallery! Explore a curated collection of
					images and videos highlighting the diverse projects we&apos;ve
					successfully completed.
				</Text>
			</Stack>

			<SimpleGrid cols={{ base: 2, sm: 3, md: 3, lg: 4 }} spacing='sm'>
				{projects.map((project, i) => (
					<ProjectCard key={i} project={project} />
				))}
			</SimpleGrid>
		</Container>
	)
}
export default page
