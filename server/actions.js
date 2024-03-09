'use server'

import { fetcher, groupCategories } from '@/utils/functions'

export const fetchBlogsCount = async () => {
	const { status, message, data } = await fetcher(
		'https:portal.bs42.net/api/frontend/blogs/count'
	)

	if (status === 'success') return data
	if (status === 'error') throw new Error(message)
}

export const searchProducts = async value => {
	const response = await fetcher(
		`https:portal.bs42.net/api/frontend/products/search?q=${value}`,
		{ cache: 'no-store' }
	)

	return response
}

export const getAllCategories = async group => {
	const { status, message, data } = await fetcher(
		'http://localhost:3001/api/frontend/categories',
		{ next: { revalidate: 3600 } }
	)

	if (status === 'success') {
		if (group) {
			const categories = groupCategories(data)
			return categories
		} else {
			return data
		}
	}
	if (status === 'error') throw new Error(message)
}

export const fetchActiveCurrency = async () => {
	const { status, message, data } = await fetcher(
		'https:portal.bs42.net/api/frontend/currency/active',
		{ next: { revalidate: 3600 } }
	)

	if (status === 'success') {
		return data
	}
	if (status === 'error') throw new Error(message)
}

export const fetchSlides = async () => {
	const { status, message, data } = await fetcher(
		'https:portal.bs42.net/api/frontend/slides',
		{ next: { revalidate: 3600 } }
	)

	if (status === 'success') {
		return data
	}
	if (status === 'error') throw new Error(message)
}
