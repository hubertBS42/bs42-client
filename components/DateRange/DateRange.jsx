'use client'
import { DatePickerInput } from '@mantine/dates'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
import { useState } from 'react'

const DateRange = () => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const startDate = params.get('startDate')
	const endDate = params.get('endDate')

	const handleChange = values => {
		const startDate = values[0]?.toISOString().substring(0, 10)
		const endDate = values[1]?.toISOString().substring(0, 10)

		if (startDate && endDate) {
			params.set('startDate', startDate)
			params.set('endDate', endDate)
			params.set('page', 1)
			replace(`${pathname}?${params}`)
		}

		if (!startDate && !endDate) {
			params.delete('startDate')
			params.delete('endDate')
			params.set('page', 1)
			replace(`${pathname}?${params}`)
		}
	}
	return (
		<DatePickerInput
			type='range'
			label='Publish Period'
			defaultValue={
				startDate && endDate
					? [new Date(startDate), new Date(endDate)]
					: []
			}
			onChange={handleChange}
			valueFormat='DD/MM/YYYY'
			placeholder='Start Date - End Date'
			clearable={true}
		/>
	)
}
export default DateRange
