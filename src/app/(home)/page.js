import Footer from "@/components/Footer"
import HomeHeroSection from "@/components/Home/HomeHeroSection"

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
