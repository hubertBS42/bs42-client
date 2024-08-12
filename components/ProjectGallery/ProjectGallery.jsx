'use client'
import Lightbox from 'yet-another-react-lightbox'
import Video from 'yet-another-react-lightbox/plugins/video'
import NextJsImage from '../NextJsImage/NextJsImage'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/plugins/counter.css'

const ProjectGallery = ({ open, setOpen, media }) => {
	return (
		<Lightbox
			plugins={[Video, Thumbnails, Zoom, Counter]}
			open={open}
			close={() => setOpen(false)}
			zoom={{
				maxZoomPixelRatio: 5,
				scrollToZoom: true,
			}}
			slides={media.map(item => {
				if (item.type === 'video') {
					return {
						type: 'video',
						width: 1280,
						height: 720,
						sources: [
							{
								src: item.content.url,
								type: 'video/mp4',
							},
						],
					}
				}
				return {
					src: item.content.url,
				}
			})}
			render={{ slide: NextJsImage, thumbnail: NextJsImage }}
			counter={{ container: { style: { top: 0, bottom: 'unset' } } }}
		/>
	)
}
export default ProjectGallery
