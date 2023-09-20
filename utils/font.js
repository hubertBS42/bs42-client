import { Arimo, Rajdhani } from 'next/font/google'

export const arimo = Arimo({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-arimo',
})

export const rajdhani = Rajdhani({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-rajdhani',
})
