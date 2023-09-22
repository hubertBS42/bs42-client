'use client'

import { Carousel } from '@mantine/carousel'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { Box, Button, Overlay, Stack, Title } from '@mantine/core'
import Link from 'next/link'
import { arimo } from '@/utils/font'
import classes from './CategoryCarousel.module.scss'

const CategoryCarousel = ({ category }) => {
	const autoplay = useRef(Autoplay({ delay: 8000 }))

	const slides = category?.images.map(image => (
		<Carousel.Slide key={image._id} pos='relative'>
			<Overlay color='#000' opacity={0.5} />
			<Image
				src={image.url}
				fill
				sizes='(max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1440px) 1440px 100vw'
				style={{ objectFit: 'cover' }}
				alt='img'
				priority
			/>
		</Carousel.Slide>
	))
	return (
		<Box pos='relative'>
			<Stack className={classes.innerWrapper}>
				<Title order={3} tt='uppercase' fw={600}>
					{category?.name}
				</Title>

				<Stack className={classes.links} gap={10}>
					{category?.children.map(category => (
						<Link
							key={category.id}
							href={`/shop/category/${category.slug}`}
							className='animated-link'
						>
							{category.name}
						</Link>
					))}
				</Stack>

				<Button
					component={Link}
					href='#'
					className={classes.button}
					color='cRed.0'
				>
					Shop now
				</Button>
			</Stack>

			<Carousel
				height={410}
				slideSize='100%'
				loop
				align='center'
				plugins={[autoplay.current]}
				onMouseEnter={autoplay.current.stop}
				onMouseLeave={autoplay.current.reset}
				slidesToScroll={1}
				withControls={false}
				style={theme => ({
					borderRadius: theme.radius.sm,
					overflow: 'hidden',
				})}
			>
				{slides}
			</Carousel>
		</Box>
	)
}
export default CategoryCarousel
