'use client'
import { ActionIcon, Group, MediaQuery, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import SearchField from '../SearchField/SearchField'
import SearchResultsSection from '../SearchResultsSection/SearchResultsSection'
import { rajdhani } from '@/utils/font'

const MobileSearchModal = () => {
	const [opened, { open, close }] = useDisclosure(false)
	return (
		<Group hiddenFrom='sm'>
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
				<SearchField />
				<SearchResultsSection />
			</Modal>
		</Group>
	)
}
export default MobileSearchModal
