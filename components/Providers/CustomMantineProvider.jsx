'use client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { NavigationProgress } from '@mantine/nprogress'

import { arimo, rajdhani } from '@/utils/font'
import '@mantine/core/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/carousel/styles.css'

const CustomMantineProvider = ({ children }) => {
	return (
		<MantineProvider
			theme={{
				fontFamily: arimo.style.fontFamily,
				headings: { fontFamily: rajdhani.style.fontFamily },
				colors: {
					cRed: ['#b20000'],
				},
			}}
		>
			<NavigationProgress />
			<Notifications />
			{children}
		</MantineProvider>
	)
}
export default CustomMantineProvider
