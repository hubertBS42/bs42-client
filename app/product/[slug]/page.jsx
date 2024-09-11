import ProductDetailsBottomSection from '@/components/ProductDetailsBottomSection/ProductDetailsBottomSection'
import ProductDetailsTopSection from '@/components/ProductDetailsTopSection/ProductDetailsTopSection'
import { fetcher } from '@/utils/functions'

export async function generateMetadata({ params: { slug } }) {
	const { product } = await fetcher(
		`https://portal.bs42.net/api/products/${slug}`,
		{ cache: 'no-store' }
	)

	return {
		title: `${product.title} - BS42.NET`,
	}
}

const ProductDetails = async ({ params: { slug } }) => {
	const [{ product }, { rate }] = await Promise.all([
		fetcher(`https://portal.bs42.net/api/products/${slug}`, {
			cache: 'no-store',
		}),
		fetcher('https://portal.bs42.net/api/currencies/current-rate'),
	])

	return (
		<>
			<ProductDetailsTopSection product={product} rate={rate} />
			<ProductDetailsBottomSection product={product} />
		</>
	)
}
export default ProductDetails
