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
