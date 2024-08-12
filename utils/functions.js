import { geoData } from './data'

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
		'https://portal.bs42.net/api/frontend/brands',
		{ next: { revalidate: 3600 } }
	)

	return res.json()
}

export const getCategories = async () => {
	const res = await fetch(
		'https://portal.bs42.net/api/frontend/categories',
		{ next: { revalidate: 3600 } }
	)

	return res.json()
}

export const getProjects = async () => {
	const res = await fetch(
		'https://portal.bs42.net/api/frontend/projects',
		{ next: { revalidate: 3600 } }
	)

	return res.json()
}

export const getActiveCurrency = async () => {
	const res = await fetch(
		'https://portal.bs42.net/api/frontend/currency/active',
		{ next: { revalidate: 3600 } }
	)

	return res.json()
}

export const formatDate = date => {
	const options = { day: 'numeric', month: 'short', year: 'numeric' }
	const formattedDate = new Date(date).toLocaleDateString(
		'en-GB',
		options
	)

	// Append 'st', 'nd', 'rd', or 'th' to the day
	const day = new Date(date).getDate()
	let daySuffix
	if (day === 1 || day === 21 || day === 31) {
		daySuffix = 'st'
	} else if (day === 2 || day === 22) {
		daySuffix = 'nd'
	} else if (day === 3 || day === 23) {
		daySuffix = 'rd'
	} else {
		daySuffix = 'th'
	}

	// Replace the day with the formatted day including the suffix
	const formattedDay = day + daySuffix

	// Construct the final formatted date string
	return formattedDate.replace(/\b\d+\b/, formattedDay)
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

const findCategoryByIdWithAncestors = (
	categories,
	id,
	ancestors = []
) => {
	for (const category of categories) {
		if (category.id === id) {
			return [...ancestors, category]
		}

		if (category.children && category.children.length > 0) {
			const result = findCategoryByIdWithAncestors(
				category.children,
				id,
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

export const groupProductsByTopLevelCategory = (
	products,
	categories
) => {
	const groupedProducts = []

	// Loop through each product
	for (const product of products) {
		// Find the top-level category for the product
		const topLevelCategory = findCategoryByIdWithAncestors(
			categories,
			product.category._id
		)[0]

		// 	// Use the top-level category ID as the key for grouping
		// 	const key = topLevelCategory[0].name

		// 	// Add the product to the corresponding group
		// 	if (!groupedProducts[key]) {
		// 		groupedProducts[key] = []
		// 	}
		// 	groupedProducts[key].push(product)
		// }

		// return groupedProducts

		// Check if the category is already in the groupedProducts array
		const existingGroup = groupedProducts.find(
			group => group.category === topLevelCategory.name
		)

		// If the category is not in the array, add it with an array of products
		if (!existingGroup) {
			groupedProducts.push({
				category: topLevelCategory.name,
				products: [product],
			})
		} else {
			// If the category is already in the array, add the product to its products array
			existingGroup.products.push({
				...product,
			})
		}
	}

	return groupedProducts
}

export const extractTowns = value => {
	const towns = geoData.find(region => region.name === value).towns

	return towns
}

export const fetchRegions = () => {
	const regions = geoData.map(region => region.name)
	return regions
}

export const capitalizeFirstLetter = word => {
	const regex = /(\b[a-z](?!\s))/g

	return word.replace(regex, x => {
		return x.toUpperCase()
	})
}
