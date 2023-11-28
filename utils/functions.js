export const fetcher = (...args) =>
	fetch(...args).then(res => res.json())

export const getProducts = async searchParams => {
	const category = searchParams?.category || null
	const brand = searchParams?.brand || null
	const minPrice = searchParams?.min_price || null
	const maxPrice = searchParams?.max_price || null
	const sortBy = searchParams?.sort_by || 'newest'
	const limit = searchParams?.limit || '25'
	const page = searchParams?.page || '1'

	const res = await fetch(
		`https://portal.bs42.net/api/frontend/products?category=${category}&brand=${encodeURIComponent(
			brand
		)}&minPrice=${minPrice}&maxPrice=${maxPrice}&limit=${limit}&page=${page}&sortBy=${sortBy}`,
		{ cache: 'no-store' }
	)

	return res.json()
}

export const getBrands = async () => {
	const res = await fetch(
		'https://portal.bs42.net/api/frontend/brands'
	)

	return res.json()
}

export const getCategories = async () => {
	const res = await fetch(
		'https://portal.bs42.net/api/frontend/categories'
	)

	return res.json()
}

export const extractCategoryIds = category => {
	const categoryIds = []

	const recursiveExtractIds = category => {
		categoryIds.push(category?.id)
		if (category?.children && category?.children.length > 0) {
			for (const childCategory of category.children) {
				recursiveExtractIds(childCategory)
			}
		}
	}

	recursiveExtractIds(category)
	return categoryIds
}

export const formatCategoriesForHeader = (
	categories,
	parent = null
) => {
	return categories
		.filter(category => category.parent === parent)
		.map(category => ({
			id: category._id,
			name: category.name,
			description: category.description,
			parent: category.parent,
			slug: category.slug,
			images: category.images,
			isActive: category.isActive,
			createdAt: category.createdAt,
			children: formatCategoriesForHeader(categories, category._id),
		}))
}

export const getDateDifference = dateCreated => {
	const presentDay = new Date()
	const createdDate = new Date(dateCreated)
	const presentDayTimeStamp = presentDay.getTime()
	const dateCreatedTimeStamp = createdDate.getTime()

	const diffInMilliseconds = presentDayTimeStamp - dateCreatedTimeStamp
	const diffInSeconds = diffInMilliseconds / 1000
	const diffInMinutes = diffInSeconds / 60
	const diffInHours = diffInMinutes / 60
	const diffInDays = diffInHours / 24

	return diffInDays
}

export const roundMoney = amount => {
	const roundedAmount =
		Math.round(amount * Math.pow(10, 2)) / Math.pow(10, 2)
	return roundedAmount.toFixed(2)
}

export const calculateTotalPages = (totalRecords, limitPerPage) => {
	return Math.ceil(totalRecords / limitPerPage)
}

export const getInitials = (firstName, lastName) => {
	const firstInitial = firstName?.charAt(0)
	const lastInitial = lastName?.charAt(0)

	const initials = `${firstInitial}${lastInitial}`
	return initials.toUpperCase()
}

const extractIds = categories => {
	let ids = []

	for (const category of categories) {
		ids.push(category.id)

		if (category.children && category.children.length > 0) {
			// Recursively extract ids from children
			ids.push(...extractIds(category.children))
		}
	}

	return ids
}

export const groupCategories = (categories, parent = null) => {
	return categories
		.filter(category => category.parent === parent)
		.map(category => ({
			id: category._id,
			name: category.name,
			description: category.description,
			parent: category.parent,
			slug: category.slug,
			images: category.images,
			isActive: category.isActive,
			createdAt: category.createdAt,
			children: groupCategories(categories, category._id),
		}))
}

export const findIdsBySlugWithChildren = (categories, targetSlug) => {
	for (const category of categories) {
		if (category.slug === targetSlug) {
			const result = [category.id]

			if (category.children && category.children.length > 0) {
				// Recursively extract ids from children
				result.push(...extractIds(category.children))
			}

			return result
		}

		if (category.children && category.children.length > 0) {
			const result = findIdsBySlugWithChildren(
				category.children,
				targetSlug
			)

			if (result.length > 0) {
				// If the category is found in children, return the result
				return result
			}
		}
	}

	// If the category is not found
	return []
}

export const findCategoryBySlugWithAncestors = (
	categories,
	targetSlug,
	ancestors = []
) => {
	for (const category of categories) {
		if (category.slug === targetSlug) {
			return [...ancestors, category]
		}

		if (category.children && category.children.length > 0) {
			const result = findCategoryBySlugWithAncestors(
				category.children,
				targetSlug,
				[...ancestors, category]
			)
			if (result.length > ancestors.length) {
				// If the category is found in children, return the result
				return result
			}
		}
	}

	// If the category is not found
	return []
}

export const findCategoryBySlugWithAncestorsAndChildren = (
	categories,
	targetSlug,
	ancestors = []
) => {
	for (const category of categories) {
		if (category.slug === targetSlug) {
			return [...ancestors, category, ...(category.children || [])]
		}

		if (category.children && category.children.length > 0) {
			const result = findCategoryBySlugWithAncestorsAndChildren(
				category.children,
				targetSlug,
				[...ancestors, category]
			)

			if (result.length > ancestors.length) {
				// If the category is found in children, return the result
				return result
			}
		}
	}

	// If the category is not found
	return []
}
