"use client"

import TeamSearchModal from "../TeamSearchModal";
import RandomTeamMarquee from "./RandomTeamMarquee";
import Link from 'next/link'

const colors = [
    'bg-red-600/20',
    'bg-orange-600/20',
    'bg-yellow-600/20',
    'bg-green-600/20',
    'bg-blue-600/20',
    'bg-purple-600/20'
]

function getRandomColor() {
    return colors[(Math.floor(Math.random() * colors.length))]
}

export default function GuestHeroSection() { 
       
    return (
        <div className="bg-white">
            <div className="px-4 mx-auto bg-white sm:px-6 max-w-7xl">
                <div className="space-y-4">
                    <div className="py-20 space-y-6 md:mx-8">
                        <h1 className="mx-auto px-2 sm:text-3xl sm:w-2/3 md:w-3/4 xl:w-2/3 text-2xl md:text-4xl font-semibold leading-[34px] md:leading-[45px] text-center">Your Kentucky High School Football <span className={`px-2  ${getRandomColor()} font-black`}>Scoreboard</span> Headquarters</h1>
                        <p className="flex justify-center px-10 mx-auto text-center sm:px-0 sm:w-2/3 md:w-1/2">Create an account to receive score notifications when your favorite team completes a game.</p>

                        <div className="flex justify-center space-x-4">
                            <Link href="/register" className="px-6 py-3 text-xs font-semibold text-white uppercase bg-black border rounded-md">Create an Account</Link>
                            <TeamSearchModal buttonType={"large"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-16 bg-gradient-to-t from-slate-100 to-white"><RandomTeamMarquee/></div>
        </div>
    )
}