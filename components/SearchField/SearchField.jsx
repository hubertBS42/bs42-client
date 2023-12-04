import { TextInput, ActionIcon } from '@mantine/core'
import { IconSearch, IconArrowRight } from '@tabler/icons-react'

const SearchField = ({ handleSearch }) => {
	return (
		<TextInput
			icon={<IconSearch size='1.1rem' stroke={1.5} />}
			radius='xl'
			size='md'
			data-autofocus
			// rightSection={
			// 	<ActionIcon size={30} radius='xl' variant='filled'>
			// 		<IconArrowRight size='1.1rem' stroke={1.5} />
			// 	</ActionIcon>
			// }
			placeholder='What are you looking for...'
			rightSectionWidth={43}
			onChange={handleSearch}
		/>
	)
}
export default SearchField
