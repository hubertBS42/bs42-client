'use client'
import { Box, Overlay, SimpleGrid, Tabs } from '@mantine/core'
import classes from './GalleryShowcase.module.scss'
import GalleryVideoThumbnail from '../GalleryVideoThumbnail/GalleryVideoThumbnail'

const data = [
	{
		thumbnailURL:
			'https://bs42shopstorage.blob.core.windows.net/testimages/toast t.jpg',
		videoURL:
			'https://bs42shopstorage.blob.core.windows.net/testvideos/Video.mov',
	},
	{
		thumbnailURL:
			'https://bs42shopstorage.blob.core.windows.net/testimages/toast t.jpg',
		videoURL:
			'https://bs42shopstorage.blob.core.windows.net/testvideos/Video.mov',
	},
	{
		thumbnailURL:
			'https://bs42shopstorage.blob.core.windows.net/testimages/toast t.jpg',
		videoURL:
			'https://bs42shopstorage.blob.core.windows.net/testvideos/Video.mov',
	},
	{
		thumbnailURL:
			'https://bs42shopstorage.blob.core.windows.net/testimages/toast t.jpg',
		videoURL:
			'https://bs42shopstorage.blob.core.windows.net/testvideos/Video.mov',
	},
	{
		thumbnailURL:
			'https://bs42shopstorage.blob.core.windows.net/testimages/toast t.jpg',
		videoURL:
			'https://bs42shopstorage.blob.core.windows.net/testvideos/Video.mov',
	},
	{
		thumbnailURL:
			'https://bs42shopstorage.blob.core.windows.net/testimages/toast t.jpg',
		videoURL:
			'https://bs42shopstorage.blob.core.windows.net/testvideos/Video.mov',
	},
	{
		thumbnailURL:
			'https://bs42shopstorage.blob.core.windows.net/testimages/toast t.jpg',
		videoURL:
			'https://bs42shopstorage.blob.core.windows.net/testvideos/Video.mov',
	},
]

const GalleryShowcase = () => {
	return (
		<Tabs
			defaultValue='videos'
			classNames={{
				tab: classes.tab,
				tabLabel: classes.tabLabel,
				panel: classes.tabPanel,
			}}
		>
			<Tabs.List grow>
				<Tabs.Tab value='videos'>Videos</Tabs.Tab>
				<Tabs.Tab value='pictures'>Pictures</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value='videos'>
				<SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing='sm'>
					{data.map((video, i) => (
						<GalleryVideoThumbnail key={i} video={video} />
					))}
				</SimpleGrid>
			</Tabs.Panel>

			<Tabs.Panel value='pictures'>Pictures</Tabs.Panel>
		</Tabs>
	)
}
export default GalleryShowcase
