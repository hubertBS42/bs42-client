import CustomMantineProvider from './CustomMantineProvider'
import NextAuthProvider from './NextAuthProvider'
import ReduxProvider from './ReduxProvider'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const Providers = ({ children }) => {
	return (
		<>
			<CustomMantineProvider>
				<NextAuthProvider>
					<ReCaptchaProvider
						reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
						useEnterprise
					>
						<ReduxProvider>{children}</ReduxProvider>
					</ReCaptchaProvider>
				</NextAuthProvider>
			</CustomMantineProvider>
		</>
	)
}
export default Providers
