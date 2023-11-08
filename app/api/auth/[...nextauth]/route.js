import { loadCart } from '@/redux/features/cart/cartActions'
import { fetcher } from '@/utils/functions'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			async authorize(credentials, req) {
				try {
					const {
						status,
						message,
						data: user,
					} = await fetcher(
						'https://portal.bs42.net/api/user-account/signin',
						{
							method: 'POST',
							body: JSON.stringify(credentials),
							headers: {
								'Content-type': 'application/json; charset=UTF-8',
							},
						}
					)

					if (status === 'error') {
						throw new Error(message)
					}

					return user
				} catch (error) {
					throw new Error(error)
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',

		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 60 * 60, // 1 hour

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		updateAge: 24 * 60 * 60, // 24 hours

		// The session token is usually either a random UUID or string, however if you
		// need a more customized session token string, you can define your own generate function.
		generateSessionToken: () => {
			return randomUUID?.() ?? randomBytes(32).toString('hex')
		},
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user)
				return {
					...token,
					id: user?._id,
					role: user?.role?.title,
					firstName: user?.firstName,
					lastName: user?.lastName,
					profileImg: user?.profileImg?.url || null,
				}
			return token
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.accessToken = token.accessToken
			session.user.id = token.id
			session.user.role = token.role
			session.user.firstName = token.firstName
			session.user.lastName = token.lastName
			session.user.profileImg = token.profileImg

			return session
		},
	},
	secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
