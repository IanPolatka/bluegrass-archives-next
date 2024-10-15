import '@/app/global.css'
import Footer from '@/components/footer'
import Navbar from '@/components/Navbar'
import { Toaster } from "@/components/ui/sonner"

const RootLayout = ({ children }) => {
    return (
        <>
                <Navbar />
                {children}
                <Toaster richColors position="top-center" />
                <Footer />
        </>
    )
}

export const metadata = {
    title: 'New Page Title',
}

export default RootLayout
