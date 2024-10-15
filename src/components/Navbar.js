"use client"

import { useAuth } from "@/hooks/auth"
import Link from 'next/link'
import Image from 'next/image'
import NavbarDropdown from "./NavbarDropdown"
import TeamSearchModal from "./TeamSearchModal"

export default function Navbar() {
    const { user } = useAuth()
    
    return (
        <div>
            <div className="relative z-10 px-4 bg-white border-b border-gray-300 shadow">
                <div className="flex items-center h-20 py-4 mx-auto bg-white max-w-7xl">
                    <div className="flex items-center justify-between w-full md:mx-12">
                        <nav className="flex items-center space-x-2 text-sm font-semibold">
                            <Link href="/" className="mr-4 font-bold "><Image src={`/bluegrass-archives.svg`} alt="Bluegrass Archives" width="225" height="75" loading="eager" priority={true} /></Link>
                            <Link href="/football/tournaments/140" className="hidden md:block px-2 py-1.5 text-black hover:bg-sky-200/40 hover:text-sky-700 rounded-md transition duration-150 ease-in">Tournaments</Link>
                            <Link href="/football/standings/6A/2024-2025" className="hidden md:block px-2 py-1.5 text-black hover:bg-sky-200/40 hover:text-sky-700 rounded-md transition duration-150 ease-in">Standings</Link>
                        </nav>
                        {user ?
                            <div className="flex items-center text-sm font-semibold">
                                <TeamSearchModal buttonType={"small"} />
                                <NavbarDropdown user={user} />
                            </div>
                        :
                            <div className="flex items-center space-x-4 text-sm font-semibold">
                                <TeamSearchModal buttonType={"small"} />
                                <Link href="/login">Login</Link>
                                <Link href="/register" className="px-2 py-1.5 text-white bg-black rounded-md">Register</Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
