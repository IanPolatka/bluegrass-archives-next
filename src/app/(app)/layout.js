'use client'

import { useAuth } from '@/hooks/auth'
import Loading from '@/app/(app)/Loading'
import { Toaster } from "@/components/ui/sonner"
import Navbar from '@/components/Navbar'

const AppLayout = ({ children }) => {
    // const { user } = useAuth({ middleware: 'auth' })
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <main>{children}</main>
                
                <Toaster position="top-center" />
            </div>
        </>
    )
}

export default AppLayout
