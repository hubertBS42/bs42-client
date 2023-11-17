import ProductDetailsBottomSection from '@/components/ProductDetailsBottomSection/ProductDetailsBottomSection'
import ProductDetailsTopSection from '@/components/ProductDetailsTopSection/ProductDetailsTopSection'
import { fetcher } from '@/utils/functions'

const ProductDetails = async ({ params: { slug } }) => {
	const { data } = await fetcher(
		`https://portal.bs42.net/api/products/${slug}`,
		{ cache: 'no-store' }
	)

	return (
		<>
			<ProductDetailsTopSection data={data} />
			<ProductDetailsBottomSection data={data} />
		</>
	)
}
export default ProductDetails
