import { Breadcrumbs } from '@mantine/core'
import classes from './CartBreadcrumbs.module.scss'
import Link from 'next/link'

const CartBreadcrumbs = () => {
	const data = [
		{ label: 'Home', href: '/' },
		{ label: 'Cart', href: '#' },
	]

	const items = data.map((item, index) => {
		if (index === data.length - 1) {
			return (
				<Link
					key={index}
					className={classes.link}
					active='true'
					href={item.href}
				>
					{item.label}
				</Link>
			)
		}

		return (
			<Link key={index} className={classes.link} href={item.href}>
				{item.label}
			</Link>
		)
	})

	return <Breadcrumbs py='sm'>{items}</Breadcrumbs>
}
export default CartBreadcrumbs
