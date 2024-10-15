import '@/app/global.css'
import { Toaster } from "@/components/ui/sonner"


const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <link rel="icon" type="image/svg+xml" href="/bluegrass-archives-favicon.png" />
            <body className="antialiased">
                {children}
                <Toaster richColors position="top-center" toastOptions={{
                    duration: 4000
                }} />
            </body>
        </html>
    )
}

export const metadata = {
    title: 'Bluegrass Archives',
}

export default RootLayout
