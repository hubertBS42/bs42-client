'use client'
import {
	Badge,
	Box,
	Group,
	Modal,
	Overlay,
	Stack,
	Text,
} from '@mantine/core'
import { IconCalendarEvent, IconMapPin } from '@tabler/icons-react'
import Image from 'next/image'
import testImage from '@/public/images/testImage.jpg'
import { useDisclosure } from '@mantine/hooks'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import { useState } from 'react'

const ProjectCard = () => {
	const TRANSITION_DURATION = 200
	const [opened, { open, close }] = useDisclosure(false)
	const [embla, setEmbla] = useState(null)

	useAnimationOffsetEffect(embla, TRANSITION_DURATION)

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				withCloseButton={false}
				size='xl'
				transitionProps={{ duration: TRANSITION_DURATION }}
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 4,
				}}
				styles={{
					body: { padding: 0 },
					content: { background: 'transparent' },
				}}
			>
				<div style={{ display: 'flex' }}>
					<Carousel
						getEmblaApi={setEmbla}
						withIndicators
						height='100%'
						style={{ flex: 1 }}
					>
						<Carousel.Slide pos='relative'>
							<Image
								src={testImage}
								alt='test'
								fill
								style={{ objectFit: 'cover' }}
							/>
						</Carousel.Slide>
						<Carousel.Slide pos='relative'>
							<VideoPlayer
								url='https://bs42shopstorage.blob.core.windows.net/testvideos/Video.mov'
								// thumbnail={video.thumbnailURL}
							/>
						</Carousel.Slide>
						<Carousel.Slide pos='relative'>
							<Image
								src={testImage}
								alt='test'
								fill
								style={{ objectFit: 'cover' }}
							/>
						</Carousel.Slide>
						<Carousel.Slide pos='relative'>
							<Image
								src={testImage}
								alt='test'
								fill
								style={{ objectFit: 'cover' }}
							/>
						</Carousel.Slide>
					</Carousel>
				</div>
			</Modal>
			<Box pos='relative' h={{ base: 180, sm: 250 }} onClick={open}>
				<Image src={testImage} alt='test image' fill objectFit='cover' />
				<Overlay backgroundOpacity={0.2}>
					<Stack justify='space-between' h='100%' p='sm'>
						<Badge color='green' ml='auto' fw={300} fz={9}>
							Completed
						</Badge>

						<Stack gap={1}>
							<Group gap={5} c='white' align='center'>
								<IconMapPin size={17} />
								<Text fz={13} fw={200}>
									Lashibi, Greater Accra
								</Text>
							</Group>
							<Group gap={5} c='white' align='center'>
								<IconCalendarEvent size={17} />
								<Text fz={13} fw={200}>
									20th September 2024
								</Text>
							</Group>
						</Stack>
					</Stack>
				</Overlay>
			</Box>
		</>
	)
}
export default ProjectCard
