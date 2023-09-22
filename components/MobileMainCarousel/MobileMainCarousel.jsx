'use client'

import { Carousel } from '@mantine/carousel'
import {
	Button,
	Container,
	MediaQuery,
	Overlay,
	Stack,
	Text,
	Title,
} from '@mantine/core'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import classes from './MobileMainCarousel.module.scss'

const images = [
	'/images/img1.webp',
	'/images/img2.webp',
	'/images/img3.webp',
]

const MobileMainCarousel = () => {
	const autoplay = useRef(Autoplay({ delay: 5000 }))
	const [carouselIndex, setCarouselIndex] = useState(0)

	const slides = images.map((url, i) => (
		<Carousel.Slide key={i}>
			<Image
				src={url}
				fill
				sizes='100vw'
				style={{ objectFit: 'cover' }}
				alt=''
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
						Smart Homes
					</Title>

					<Text
						className={`${classes.text} ${
							carouselIndex === i && classes.textActive
						}`}
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Sapiente voluptates labore.
					</Text>
					<Button
						component={Link}
						href='#'
						className={`${classes.button} ${
							carouselIndex === i && classes.buttonActive
						}`}
						color='cRed.0'
					>
						Shop now
					</Button>
				</Stack>
			</Container>
		</Carousel.Slide>
	))
	return (
		<>
			<Carousel
				height={300}
				plugins={[autoplay.current]}
				onMouseEnter={autoplay.current.stop}
				onMouseLeave={autoplay.current.reset}
				loop
				onSlideChange={setCarouselIndex}
				classNames={{
					root: classes.root,
					controls: classes.controls,
				}}
				hiddenFrom='xs'
			>
				{slides}
			</Carousel>
		</>
	)
}
export default MobileMainCarousel
