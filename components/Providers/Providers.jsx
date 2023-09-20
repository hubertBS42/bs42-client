import CustomMantineProvider from './CustomMantineProvider'
import ReduxProvider from './ReduxProvider'

const Providers = ({ children }) => {
	return (
		<>
			<CustomMantineProvider>
				<ReduxProvider>{children}</ReduxProvider>
			</CustomMantineProvider>
		</>
	)
}
export default Providers
