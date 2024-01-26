'use client'
import { Box, Card, Radio, Stack, Title } from '@mantine/core'
import classes from './ConditionCard.module.scss'
import {
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
import { useState } from 'react'

const ConditionCard = () => {
	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const pathname = usePathname()
	const params = new URLSearchParams(searchParams)
	const condition = params.get('condition')

	const conditions = [
		{ id: 1, label: 'New', value: 'new' },
		{ id: 2, label: 'Used', value: 'used' },
	]

	const handleChange = value => {
		params.set('condition', value)
		params.set('page', 1)
		replace(`${pathname}?${params}`)
	}

	const handleClear = () => {
		params.delete('condition')
		params.set('page', 1)
		replace(`${pathname}?${params}`)
	}

	const renderConditions = conditions.map(condition => (
		<Radio
			key={condition.id}
			value={condition.value}
			label={condition.label}
			size='xs'
		/>
	))

	return (
		<Card
			withBorder
			radius='sm'
			classNames={{
				section: classes.cardSection,
			}}
		>
			<Card.Section withBorder>
				<Title order={5} c='gray.7' tt='uppercase'>
					Shop By Condition
				</Title>
			</Card.Section>
			<Card.Section withBorder pt='lg' pb='md'>
				<Radio.Group
					onChange={value => handleChange(value)}
					value={condition}
				>
					<Stack>{renderConditions}</Stack>
				</Radio.Group>
				<Box
					tt='uppercase'
					fz={11}
					fw={500}
					c='gray'
					mt='md'
					style={{
						cursor: 'pointer',
					}}
					onClick={handleClear}
				>
					Clear
				</Box>
			</Card.Section>
		</Card>
	)
}
export default ConditionCard
