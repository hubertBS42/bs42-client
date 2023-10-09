/** @type {import('next').NextConfig} */
const nextConfig = {
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
				destination: 'https://portal.bs42.net/api/applications/add',
			},
			{
				source: '/api/user-account/signin',
				destination: 'https://portal.bs42.net/api/user-account/signin',
			},
		]
	},
}

module.exports = nextConfig
