import BlogsSection from '@/components/BlogsSection/BlogsSection'
import DesktopMainCarousel from '@/components/DesktopMainCarousel/DesktopMainCarousel'
import FeaturedProductsShowcase from '@/components/FeaturedProductsShowcase/FeaturedProductsShowcase'
import MobileMainCarousel from '@/components/MobileMainCarousel/MobileMainCarousel'
import SpecificProductsShowcase from '@/components/SpecificProductsShowcase/SpecificProductsShowcase'
import YouMightLike from '@/components/YouMightLike/YouMightLike'

export const metadata = {
	title: 'Welcome - BS42.NET',
	description:
		'We offer sales, configuration and management of networking systems with guaranteed reliable, high-speed transfer rates. All equipments are tested to meet the highest industry standars. We turn traditional appliances into smart ones by setting them up to be controlled with your phone or smart hub. Set up automation within smart home ecosystems to trigger actions based on specific conditions or schedules.',
}

export default async function Home() {
	return (
		<main>
			<DesktopMainCarousel />
			<MobileMainCarousel />
			<FeaturedProductsShowcase />
			<SpecificProductsShowcase target='Networking' />
			<SpecificProductsShowcase target='Security' />
			<SpecificProductsShowcase target='Smart Homes' />
			<YouMightLike />
			<BlogsSection />
		</main>
	)
}
