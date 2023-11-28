'use client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import { arimo, rajdhani } from '@/utils/font'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/notifications/styles.css'

const CustomMantineProvider = ({ children }) => {
	return (
		<MantineProvider
			theme={{
				fontFamily: arimo.style.fontFamily,
				headings: { fontFamily: rajdhani.style.fontFamily },
				cursorType: 'pointer',
				colors: {
					cRed: ['#b20000'],
				},
			}}
		>
			<Notifications />
			{children}
		</MantineProvider>
	)
}
export default CustomMantineProvider
