import { ColorSchemeScript } from '@mantine/core'
import Providers from '@/components/Providers/Providers'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

import './globals.scss'
import { arimo, rajdhani } from '@/utils/font'

export default function RootLayout({ children }) {
	const today = new Date()
	const year = today.getFullYear()
	return (
		<html
			lang='en'
			className={`${arimo.variable} ${rajdhani.variable}`}
		>
			<head>
				<ColorSchemeScript />
			</head>
			<body suppressHydrationWarning={true}>
				<Providers>
					<Header />
					{children}
					<Footer year={year} />
				</Providers>
			</body>
		</html>
	)
}
