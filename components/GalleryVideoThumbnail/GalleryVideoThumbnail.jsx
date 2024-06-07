import { Box, Modal, Overlay } from '@mantine/core'
import { useDisclosure, useHover } from '@mantine/hooks'
import Image from 'next/image'
import { IconPlayerPlay } from '@tabler/icons-react'
import VideoPlayer from '../VideoPlayer/VideoPlayer'

const GalleryVideoThumbnail = ({ video }) => {
	const [opened, { open, close }] = useDisclosure(false)
	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				withCloseButton={false}
				size='xl'
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 4,
				}}
				styles={{
					body: { padding: 0 },
					content: { background: 'transparent' },
				}}
			>
				<VideoPlayer
					url={video.videoURL}
					thumbnail={video.thumbnailURL}
				/>
			</Modal>
			<Box
				pos='relative'
				h={{ base: 150, sm: 200 }}
				style={{ cursor: 'pointer' }}
				onClick={open}
			>
				<Image
					src={video.thumbnailURL}
					alt='test image'
					fill
					objectFit='cover'
				/>
				<Overlay
					backgroundOpacity={0.2}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<IconPlayerPlay color='white' size={40} />
				</Overlay>
			</Box>
		</>
	)
}
export default GalleryVideoThumbnail
