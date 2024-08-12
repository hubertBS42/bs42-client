'use client'
import {
	Badge,
	Box,
	Group,
	Overlay,
	Stack,
	Text,
} from '@mantine/core'
import { IconCalendarEvent, IconMapPin } from '@tabler/icons-react'
import Image from 'next/image'
import { useState } from 'react'

import ProjectGallery from '../ProjectGallery/ProjectGallery'
import { formatDate } from '@/utils/functions'

const ProjectCard = ({ project }) => {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Box
				pos='relative'
				h={{ base: 180, sm: 250 }}
				onClick={() => setOpen(true)}
				style={{ cursor: 'pointer' }}
			>
				<Image
					src={project.cardImg.url}
					alt={project.title}
					fill
					style={{ objectFit: 'cover' }}
				/>
				<Overlay backgroundOpacity={0.2}>
					<Stack justify='space-between' h='100%' p='sm'>
						{project.isCompleted ? (
							<Badge color='green' ml='auto' fw={300} fz={9}>
								Completed
							</Badge>
						) : (
							<Badge color='blue' ml='auto' fw={300} fz={9}>
								Ongoing
							</Badge>
						)}

						<Stack gap={1}>
							<Group gap={5} c='white' align='center'>
								<IconMapPin size={17} />
								<Text fz={13} fw={200}>
									{project.town}, {project.region}
								</Text>
							</Group>
							<Group gap={5} c='white' align='center'>
								<IconCalendarEvent size={17} />
								<Text fz={13} fw={200}>
									{formatDate(project.date)}
								</Text>
							</Group>
						</Stack>
					</Stack>
				</Overlay>
			</Box>

			<ProjectGallery
				open={open}
				setOpen={setOpen}
				media={project.media}
			/>
		</>
	)
}
export default ProjectCard
