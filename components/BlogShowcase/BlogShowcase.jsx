'use client'
import { Box, Button, Divider, Flex } from '@mantine/core'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Section from '../Section/Section'
import { Carousel } from '@mantine/carousel'
import BlogCard from '../BlogCard/BlogCard'
import classes from './BlogShowcase.module.scss'

const BlogShowcase = () => {
	const autoplay = useRef(Autoplay({ delay: 4000 }))
	return (
		<Section>
			<Box>
				<Divider
					mb={30}
					label='Recent Blog Posts'
					labelPosition='center'
					classNames={{
						label: classes.label,
					}}
				/>
				<Carousel
					height='100%'
					loop
					align='start'
					plugins={[autoplay.current]}
					onMouseEnter={autoplay.current.stop}
					onMouseLeave={autoplay.current.reset}
					slideSize={{ base: '50%', xs: '33.33%' }}
					slideGap={{ base: 'sm', lg: 'md' }}
					slidesToScroll={3}
					withControls={false}
				>
					<Carousel.Slide>
						<BlogCard />
					</Carousel.Slide>
					<Carousel.Slide>
						<BlogCard />
					</Carousel.Slide>
					<Carousel.Slide>
						<BlogCard />
					</Carousel.Slide>
				</Carousel>
				<Flex justify='center' mt={40}>
					<Button className='viewMoreBtn'>View more</Button>
				</Flex>
			</Box>
		</Section>
	)
}
export default BlogShowcase
