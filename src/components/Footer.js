"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {    
    return (
        <div>
            <div className="relative px-4 mt-12 bg-white border-t border-gray-300">
                <div className="flex items-center py-4 mx-auto mt-10 bg-white max-w-7xl">
                    <div className="flex items-center justify-between w-full md:mx-12">
                        <Link href="/" className="mr-4 font-bold "><Image src={`/bluegrass-archives.svg`} alt="Bluegrass Archives" width="200" height="50" /></Link>
                    </div>
                    <div className="flex items-end justify-end w-full space-x-4 text-sm md:mx-12">
                        <Link href="/football/tournaments/140" className="font-bold ">Tournaments</Link>
                        <Link href="/football/standings/1A/2024-2025" className="mr-4 font-bold ">Standings</Link>
                    </div>
                </div>
                <div className="flex items-center pb-10 mx-auto mt-10 text-sm bg-white max-w-7xl">
                    <div className="flex items-center justify-between w-full my-4 border-t md:mx-12">
                        <p className="pt-4">Made in the ❤️ of Kentucky</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-2 bg-sky-500"></div>
        </div>
    )
}