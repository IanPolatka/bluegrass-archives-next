"use client"

import React from 'react'
import ScheduleTeamsDropdown from './ScheduleTeamsDropdown'
import ScheduleYearsDropdown from './ScheduleYearsDropdown'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from "@/hooks/auth"
import FavoriteToggle from './Schedules/FavoriteToggle'


export default function TeamDetails(params) {
    const slug = params.slug
    const team = params.team
    const { user } = useAuth({ middleware: 'guest' })

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    return (
        <div className="!mb-10">
            <div className="bg-white border border-gray-300 rounded-md shadow-md ">
                <div className="grid items-center gap-4 p-4 py-4 pb-4 md:p-8 md:grid-cols-2">
                    <div className="flex items-center">
                        <div className={team.data[0].Team.team_color ? `bg-${team.data[0].Team.team_color}-600/10 h-[80px] w-[80px] rounded-full mr-4 p-1` : 'bg-gray-600/10 h-[80px] w-[80px] bg-gray-50 rounded-full mr-4 p-1'}>
                            <Image
                                src={`${team?.data[0].Team.logo}`}
                                height={80}
                                width={80}
                                className="p-2 mr-4"
                                alt={`${team?.data[0].Team.name}`}
                            />
                        </div>
                        <div className="items-center md:space-y-2 md:block xl:flex">
                            <div>
                                <div className="flex items-center space-x-8 text-xl font-semibold">{team?.data[0].Team.name}</div>
                                <div className="text-base text-gray-500">{team?.data[0].Team.mascot}</div>
                            </div>
                            {user &&
                                <div>
                                    <div className="mt-2 lg:mt-0">
                                        {/* <TeamDetailsFavoriteButton slug={slug} /> */}
                                        {user &&
                                            <FavoriteToggle slug={slug} />
                                        }
                                    </div>
                                </div>
                            }  
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-2 gap-4">
                            <ScheduleTeamsDropdown />
                            <ScheduleYearsDropdown />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap border-t border-gray-300 divide-gray-300 sm:divide-x">
                    <div className="w-1/2 py-4 pl-4 pr-4 border-b border-r border-gray-300 md:px-8 md:pl-8 sm:border-none sm:flex-1">
                        <div className="text-xs text-gray-500 uppercase">Record</div>
                        <div className="font-semibold">{team.data[0].Wins}-{team.data[0].Losses}</div>
                    </div>
                    <div className="w-1/2 px-4 py-4 border-b border-gray-300 md:px-8 sm:border-right sm:border-b-0 sm:flex-1">
                        <div className="text-xs text-gray-500 uppercase">Location</div>
                        <div className="font-semibold">
                            <Link href={`https://www.google.com/maps/place/${team?.data[0].Team.city}+ky`} className="flex items-center" target="_blank">
                                <div className="mr-2">{team?.data[0].Team.city}, {team?.data[0].Team.state}</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="text-gray-500"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" /><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg>
                            </Link>
                        </div>
                    </div>
                    <div className="w-1/2 py-4 pl-4 border-r border-gray-300 md:px-8 sm:flex-1 divide-none">
                        <div className="text-xs text-gray-500 uppercase">KHSAA Class</div>
                        <div className="font-semibold">
                            {team?.data[0].ClassInfo && 
                            <Link href={`/football/standings/${team?.data[0].ClassInfo.class}/${team?.data[0].ClassInfo.year}`}>Class: {team?.data[0].ClassInfo.class}</Link>}
                        </div>
                    </div>
                    <div className="w-1/2 px-4 py-4 md:px-8 sm:flex-1">
                        <div className="text-xs text-gray-500 uppercase">Head Coach</div>
                        <div className="font-semibold">
                            {team?.data[0].Coach && 
                            <Link href={`/football/coach/${team?.data[0].Coach.id}`}>{team?.data[0].Coach.name}</Link>}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}
