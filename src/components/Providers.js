"use client"

import { Toaster } from "@/components/ui/sonner"

function Providers({children}) {
    return (
        <>
            <Toaster richColors position="top-center" />
            {children}
        </>
    )
}

export default Providers
