import '@/app/global.css'
import { Toaster } from "@/components/ui/sonner"

const AppLayout = ({ children }) => {
    return (
        // <html lang="en">
        //     <body className="antialiased">
        //         {children}
        //         <Toaster richColors position="top-center" />
        //     </body>
        // </html>
        <>
        {children}
        </>
    )
}

export const metadata = {
    title: 'Bluegrass Archives',
}

export default AppLayout
