import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/video.css'

import { MediaPlayer, MediaProvider } from '@vidstack/react'
import {
	defaultLayoutIcons,
	DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default'

const VideoPlayer = ({ url, thumbnail }) => {
	return (
		<MediaPlayer
			title='Sprite Fight'
			src={url}
			style={{ overflow: 'hidden', borderRadius: 0 }}
		>
			<MediaProvider />
			<DefaultVideoLayout
				thumbnails={thumbnail}
				icons={defaultLayoutIcons}
			/>
		</MediaPlayer>
	)
}
export default VideoPlayer
