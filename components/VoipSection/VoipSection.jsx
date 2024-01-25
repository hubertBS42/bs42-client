import { Box, Container } from '@mantine/core'
import classes from './VoipSection.module.scss'

const VoipSection = ({ children, grayBg, redBg }) => {
	return (
		<Box
			className={`${classes.wrapper} ${grayBg && classes.grayBg} ${
				redBg && classes.redBg
			}`}
			py={{ base: '4em', sm: '8vw' }}
		>
			<Container size='xl'>{children}</Container>
		</Box>
	)
}
export default VoipSection
