import '@/app/global.css'
import Navbar from '@/components/Navbar'
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"

const RootLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Toaster richColors position="top-center" />
        </>
    )
}

export const metadata = {
    title: 'New Page Title',
}

export default RootLayout
