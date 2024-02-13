'use client'
import {
	ActionIcon,
	Popover,
	PopoverDropdown,
	PopoverTarget,
	Stack,
} from '@mantine/core'
import { IconAdjustments } from '@tabler/icons-react'
import BlogsSearch from '../BlogsSearch/BlogsSearch'
import classes from './FiltersPopOver.module.scss'
import DateRange from '../DateRange/DateRange'
import useSWR from 'swr'
import { fetcher } from '@/utils/functions'
import BlogAuthorSelect from '../BlogAuthorSelect/BlogAuthorSelect'

const FiltersPopOver = () => {
	const { data, error, isLoading } = useSWR(
		'https://portal.bs42.net/api/frontend/blogs/all',
		fetcher
	)

	return (
		<Popover
			width={300}
			trapFocus
			position='bottom'
			withArrow
			shadow='md'
			closeOnClickOutside={false}
		>
			<PopoverTarget>
				<ActionIcon
					variant='outline'
					aria-label='Filters'
					size='lg'
					styles={{
						root: {
							border: `1px solid var(--mantine-color-gray-4)`,
						},
					}}
				>
					<IconAdjustments size='1.4em' stroke={1.2} color='gray' />
				</ActionIcon>
			</PopoverTarget>
			<PopoverDropdown>
				<Stack>
					<BlogsSearch />
					{!isLoading && <BlogAuthorSelect data={data} />}
					<DateRange />
				</Stack>
			</PopoverDropdown>
		</Popover>
	)
}
export default FiltersPopOver
