import { Group, MediaQuery } from '@mantine/core'
import Link from 'next/link'
import classes from './TopNavLinks.module.scss'

const TopNavLinks = () => {
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
			<Link href='/contact-us' className={classes.link}>
				Contact Us
			</Link>
			{/* <Link href='/blog' className={classes.link}>
				Blog
			</Link> */}
		</Group>
	)
}
export default TopNavLinks
