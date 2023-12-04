'use client'

import { Select } from '@mantine/core'
import classes from './LimitSelect.module.scss'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'

const LimitSelect = () => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams)
	const limit = params.get('limit') || '25'

	const limitData = ['25', '50', '75', '100']

	const handleLimit = pagesParam => {
		if (pagesParam) {
			params.set('limit', pagesParam)
			params.set('page', 1)
			replace(`${pathname}?${params}`)
		}
	}

	return (
		<Select
			label='Show:'
			data={limitData}
			withCheckIcon={false}
			allowDeselect={false}
			defaultValue={limit}
			classNames={{
				root: classes.selectRoot,
				label: classes.selectLabel,
				input: classes.selectInput,
			}}
			onChange={value => handleLimit(value)}
		/>
	)
}
export default LimitSelect
