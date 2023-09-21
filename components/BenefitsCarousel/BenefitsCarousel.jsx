'use client'

import { Carousel } from '@mantine/carousel'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Group } from '@mantine/core'
import {
	IconAward,
	IconHeadset,
	IconShieldLock,
	IconTruckDelivery,
} from '@tabler/icons-react'
import classes from './BenefitsCarousel.module.scss'

const BenefitsCarousel = () => {
	const autoplay = useRef(Autoplay({ delay: 4000 }))
	return (
		<Carousel
			height='100%'
			slideSize={{ base: '100%', sm: '50%', md: '33.33%' }}
			loop
			align='start'
			plugins={[autoplay.current]}
			onMouseEnter={autoplay.current.stop}
			onMouseLeave={autoplay.current.reset}
			slidesToScroll={1}
			withControls={false}
			hiddenFrom='lg'
		>
			<Carousel.Slide>
				<Group className={classes.benefit} gap={5} justify='center'>
					<IconTruckDelivery stroke={1.6} />
					Nationwide Delivery
				</Group>
			</Carousel.Slide>
			<Carousel.Slide>
				<Group className={classes.benefit} gap={5} justify='center'>
					<IconAward stroke={1.6} />
					Rewards Program
				</Group>
			</Carousel.Slide>
			<Carousel.Slide>
				<Group className={classes.benefit} gap={5} justify='center'>
					<IconShieldLock stroke={1.6} />
					Secure Shopping
				</Group>
			</Carousel.Slide>
			<Carousel.Slide>
				<Group className={classes.benefit} gap={5} justify='center'>
					<IconHeadset stroke={1.6} />
					Experienced Support Staff
				</Group>
			</Carousel.Slide>
		</Carousel>
	)
}
export default BenefitsCarousel
