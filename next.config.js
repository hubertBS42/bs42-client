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
				// destination: 'http://localhost:3001/api/applications/add',
				destination: 'https://portal.bs42.net/api/applications/add',
			},
			{
				source: '/api/frontend/orders/add',
				// destination: 'https://portal.bs42.net/api/frontend/orders/add',
				destination: 'http://localhost:3001/api/frontend/orders/add',
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
				source: '/api/messages/add',
				destination: 'https://portal.bs42.net/api/messages/add',
				// destination: 'http://localhost:3001/api/messages/add',
			},
		]
	},
}

module.exports = nextConfig
