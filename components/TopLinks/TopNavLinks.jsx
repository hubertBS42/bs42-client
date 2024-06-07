'use client'
import { Group } from '@mantine/core'
import Link from 'next/link'
import classes from './TopNavLinks.module.scss'
import useSWR from 'swr'
import { fetcher } from '@/utils/functions'

const TopNavLinks = () => {
	const { data, error, isLoading } = useSWR(
		'https://portal.bs42.net/api/frontend/blogs/count',
		fetcher
	)

	return (
		<Group justify='center' py={10} gap='1.7vw' visibleFrom='sm'>
			<Link href='/' className={classes.link}>
				Home
			</Link>
			<Link href='/products' className={classes.link}>
				Shop
			</Link>
			<Link href='/voip' className={classes.link}>
				Voip
			</Link>
			<Link href='/academy' className={classes.link}>
				Academy
			</Link>
			<Link href='/projects' className={classes.link}>
				Projects
			</Link>
			<Link href='/contact-us' className={classes.link}>
				Contact Us
			</Link>
			{!isLoading && !error && data.count > 0 && (
				<Link href='/blogs' className={classes.link}>
					Blog
				</Link>
			)}
		</Group>
	)
}
export default TopNavLinks
