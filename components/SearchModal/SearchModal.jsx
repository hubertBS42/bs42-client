'use client'
import {
	ActionIcon,
	Flex,
	Group,
	Loader,
	Modal,
	Stack,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import SearchField from '../SearchField/SearchField'
import SearchResultsSection from '../SearchResultsSection/SearchResultsSection'
import { rajdhani } from '@/utils/font'
import { useDebouncedCallback } from 'use-debounce'
import { useEffect, useState } from 'react'
import { getAllCategories, searchProducts } from '@/server/actions'

const SearchModal = () => {
	const [opened, { open, close }] = useDisclosure(false)
	const [results, setResults] = useState([])
	const [categories, setCategories] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const handleCloseModal = () => {
		close()
		setResults([])
	}

	useEffect(() => {
		const getCategories = async () => {
			try {
				const data = await getAllCategories('group')
				setCategories(data)
			} catch (error) {
				console.log(error.message)
			}
		}
		getCategories()
	}, [])

	const handleSearch = useDebouncedCallback(async e => {
		if (e.target.value.length > 2) {
			setIsLoading(true)

			const { data, status } = await searchProducts(e.target.value)

			if (status === 'success') {
				setResults(data)
				setIsLoading(false)
			} else {
				console.log('Could not fetch products')
			}
		} else {
			setResults([])
		}
	}, 300)

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
				<Stack pb='md'>
					<SearchField handleSearch={handleSearch} />

					{isLoading ? (
						<Flex align='center' justify='center' h={100}>
							<Loader color='blue' size='sm' />
						</Flex>
					) : (
						results.length > 0 && (
							<SearchResultsSection
								results={results}
								categories={categories}
								closeModal={handleCloseModal}
							/>
						)
					)}
				</Stack>
			</Modal>
		</Group>
	)
}
export default SearchModal
