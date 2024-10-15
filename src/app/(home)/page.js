import Footer from "@/components/footer"
import HomeHeroSection from "@/components/Home/HomeHeroSection"
import Link from 'next/link'


export const metadata = {
    title: 'Bluegrass Archives',
}

const Home = () => {
    return (
        <div>
            <HomeHeroSection />
            <Footer />
        </div>
    )
}

export default Home
