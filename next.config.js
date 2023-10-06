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
				source: '/api/user-account/add',
				destination: 'https://portal.bs42.net/api/user-account/add',
			},
		]
	},
}

module.exports = nextConfig
