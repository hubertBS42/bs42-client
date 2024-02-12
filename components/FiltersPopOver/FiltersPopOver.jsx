import {
	ActionIcon,
	Popover,
	PopoverDropdown,
	PopoverTarget,
	TextInput,
} from '@mantine/core'
import { IconAdjustments } from '@tabler/icons-react'

const FiltersPopOver = () => {
	return (
		<Popover
			width={300}
			trapFocus
			position='bottom'
			withArrow
			shadow='md'
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
				<TextInput label='Name' placeholder='Name' size='xs' />
				<TextInput
					label='Email'
					placeholder='john@doe.com'
					size='xs'
					mt='xs'
				/>
			</PopoverDropdown>
		</Popover>
	)
}
export default FiltersPopOver
