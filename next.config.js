/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	reactStrictMode: true,
	// output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'bs42shopstorage.blob.core.windows.net',
				port: '',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/api/applications/add',
				destination: 'http://localhost:3001/api/applications/add',
				// destination: 'https://portal.bs42.net/api/applications/add',
			},
			{
				source: '/api/orders/add',
				destination: 'https://portal.bs42.net/api/orders/add',
				// destination: 'http://localhost:3001/api/orders/add',
			},
			{
				source: '/api/user-account/signin',
				destination: 'https://portal.bs42.net/api/user-account/signin',
			},
			{
				source: '/api/cart/update',
				destination: 'https://portal.bs42.net/api/cart/update',
				// destination: 'http://localhost:3001/api/cart/update',
			},
			{
				source: '/api/cart',
				destination: 'https://portal.bs42.net/api/cart',
				// destination: 'http://localhost:3001/api/cart',
			},
			{
				source: '/api/products',
				destination: 'https://portal.bs42.net/api/products',
			},
			{
				source: '/api/sendMail',
				destination: 'https://portal.bs42.net/api/sendMail',
				// destination: 'http://localhost:3001/api/sendMail',
			},
		]
	},
}

module.exports = nextConfig
