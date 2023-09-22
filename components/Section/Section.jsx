import { Box, Container } from '@mantine/core'
import classes from './Section.module.scss'

const Section = ({ children, grayBg }) => {
	return (
		<Box
			className={`${classes.wrapper} ${grayBg && classes.grayBg}`}
			py={{ base: '2em', sm: '3vw' }}
		>
			<Container size='xl'>{children}</Container>
		</Box>
	)
}
export default Section
