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
import classes from './MobileMainCarousel.module.scss'
import useSWR from 'swr'
import { fetcher } from '@/utils/functions'

const MobileMainCarousel = () => {
	const autoplay = useRef(Autoplay({ delay: 5000 }))
	const [carouselIndex, setCarouselIndex] = useState(0)

	let slides = []

	const { data, error, isLoading } = useSWR(
		'https://portal.bs42.net/api/frontend/slides',
		fetcher
	)

	if (!isLoading && !error) {
		slides = data.slides
	}

	const renderSlides =
		slides.length > 0 &&
		slides.map((slide, i) => (
			<Carousel.Slide key={slide.position}>
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
			{slides.length > 0 && (
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
					{renderSlides}
				</Carousel>
			)}
		</>
	)
}
export default MobileMainCarousel
