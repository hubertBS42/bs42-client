'use client'

import { Carousel } from '@mantine/carousel'
import {
	Button,
	Container,
	Overlay,
	Stack,
	Text,
	Title,
} from '@mantine/core'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import classes from './DesktopMainCarousel.module.scss'
import { useSelector } from 'react-redux'
import { getSettings } from '@/redux/features/settings/settingsSlice'

const DesktopMainCarousel = () => {
	const autoplay = useRef(Autoplay({ delay: 5000 }))
	const [carouselIndex, setCarouselIndex] = useState(0)
	const settings = useSelector(getSettings)

	const slides = settings[0]?.carouselSlides.map((slide, i) => (
		<Carousel.Slide key={slide.index}>
			<Image
				src={slide.image.url}
				fill
				sizes='100vw'
				style={{ objectFit: 'cover' }}
				alt={slide.title}
				priority
			/>
			<Overlay color='#000' opacity={0.5} />
			<Container size='xl' pos='relative'>
				<Stack className={classes.innerTextWrapper}>
					<Title
						order={1}
						className={`${classes.title} ${
							carouselIndex === i && classes.titleActive
						}`}
					>
						{slide.title}
					</Title>

					<Text
						className={`${classes.text} ${
							carouselIndex === i && classes.textActive
						}`}
					>
						{slide.description}
					</Text>
					<Button
						component={Link}
						href={slide.cta.url}
						className={`${classes.button} ${
							carouselIndex === i && classes.buttonActive
						}`}
						color='cRed.0'
					>
						{slide.cta.label}
					</Button>
				</Stack>
			</Container>
		</Carousel.Slide>
	))
	return (
		<>
			{settings[0]?.carouselSlides.length > 0 && (
				<Carousel
					height={550}
					plugins={[autoplay.current]}
					onMouseEnter={autoplay.current.stop}
					onMouseLeave={autoplay.current.reset}
					loop
					onSlideChange={setCarouselIndex}
					classNames={{
						root: classes.root,
						controls: classes.controls,
					}}
					visibleFrom='xs'
				>
					{slides}
				</Carousel>
			)}
		</>
	)
}
export default DesktopMainCarousel
