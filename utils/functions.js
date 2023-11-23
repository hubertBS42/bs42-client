export const fetcher = (...args) =>
	fetch(...args).then(res => res.json())

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

export const getInitials = (firstName, lastName) => {
	const firstInitial = firstName?.charAt(0)
	const lastInitial = lastName?.charAt(0)

	const initials = `${firstInitial}${lastInitial}`
	return initials.toUpperCase()
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
