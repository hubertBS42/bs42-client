import { Flex, Group, MediaQuery } from '@mantine/core'
import {
	IconAward,
	IconHeadset,
	IconShieldLock,
	IconTruckDelivery,
} from '@tabler/icons-react'
import classes from './Benefits.module.scss'

const Benefits = () => {
	return (
		<Flex
			visibleFrom='lg'
			justify='center'
			align='center'
			columnGap='8vw'
		>
			<Group className={classes.benefit} gap={5} justify='center'>
				<IconTruckDelivery stroke={1.6} />
				Nationwide Delivery
			</Group>
			<Group className={classes.benefit} gap={5} justify='center'>
				<IconAward stroke={1.6} />
				Rewards Program
			</Group>
			<Group className={classes.benefit} gap={5} justify='center'>
				<IconShieldLock stroke={1.6} />
				Secure Shopping
			</Group>
			<Group className={classes.benefit} gap={5} justify='center'>
				<IconHeadset stroke={1.6} />
				Experienced Support Staff
			</Group>
		</Flex>
	)
}
export default Benefits
