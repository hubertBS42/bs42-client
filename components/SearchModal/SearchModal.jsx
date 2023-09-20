'use client'
import { ActionIcon, Group, Modal, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import SearchField from '../SearchField/SearchField'
import SearchResultsSection from '../SearchResultsSection/SearchResultsSection'
import { rajdhani } from '@/utils/font'

const SearchModal = () => {
	const [opened, { open, close }] = useDisclosure(false)
	return (
		<Group visibleFrom='sm'>
			<ActionIcon variant='transparent' color='dark' onClick={open}>
				<IconSearch size='1.4em' stroke={1.2} />
			</ActionIcon>
			<Modal
				opened={opened}
				onClose={close}
				title='Search'
				ff={rajdhani.style.fontFamily}
				size='lg'
				overlayProps={{
					opacity: 0.5,
					blur: 3,
				}}
			>
				<Stack>
					<SearchField />
					<SearchResultsSection />
				</Stack>
			</Modal>
		</Group>
	)
}
export default SearchModal
