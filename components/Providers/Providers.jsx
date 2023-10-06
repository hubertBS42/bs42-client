import CustomMantineProvider from './CustomMantineProvider'
import NextAuthProvider from './NextAuthProvider'
import ReduxProvider from './ReduxProvider'

const Providers = ({ children }) => {
	return (
		<>
			<CustomMantineProvider>
				<NextAuthProvider>
					<ReduxProvider>{children}</ReduxProvider>
				</NextAuthProvider>
			</CustomMantineProvider>
		</>
	)
}
export default Providers
