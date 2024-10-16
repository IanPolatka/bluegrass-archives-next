"use client"

import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Link from 'next/link'
import Marquee from "react-fast-marquee"
import Image from 'next/image'

function RandomTeamMarquee() {
    const [randomTeamsFirst, setRandomTeamsFirst] = useState([])
    const [randomTeamsSecond, setRandomTeamsSecond] = useState([])
    const [randomTeamsThird, setRandomTeamsThird] = useState([])

    useEffect(() => {
        getRandomTeams()
    }, [])

    // Guest Hero
    const getRandomTeams = () => {

        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teams/random`)
            .then(({data}) => {
                setRandomTeamsFirst(data.data[0].first)
                setRandomTeamsSecond(data.data[0].second)
                setRandomTeamsThird(data.data[0].third)
            })
            .catch(() => {

            })
    }
    
    return (
        <div className="">
            <Marquee speed="50" className="mb-2" pauseOnHover="true">
                {randomTeamsFirst.map(team => {
                    return (
                        <Link href={`/football/${team.slug}/2024-2025`} title={team.name} key={team.id}>
                            <Image
                                src={`${team.logo}`}
                                height={96}
                                width={96}
                                alt={`${team.logo}`}
                                title={`${team.logo}`}
                                className="w-20 h-20 p-3 mx-2 bg-white border border-gray-300 rounded-md lg:h-24 lg:w-24"
                            />
                        </Link>
                    )
                })}
            </Marquee>
            <Marquee speed="70" className="mb-2" pauseOnHover="true">
                {randomTeamsSecond.map(team => {
                    return (
                        <Link href={`/football/${team.slug}/2024-2025`} title={team.name} key={team.id}>
                            <Image
                                src={`${team.logo}`}
                                height={96}
                                width={96}
                                alt={`${team.logo}`}
                                title={`${team.logo}`}
                                className="w-20 h-20 p-3 mx-2 bg-white border border-gray-300 rounded-md lg:h-24 lg:w-24"
                            />
                        </Link>
                    )
                })}
            </Marquee>
            <Marquee speed="45" pauseOnHover="true">
                {randomTeamsThird.map(team => {
                    return (
                        <Link href={`/football/${team.slug}/2024-2025`} title={team.name} key={team.id}>
                            <Image
                                src={`${team.logo}`}
                                height={96}
                                width={96}
                                alt={`${team.logo}`}
                                title={`${team.logo}`}
                                className="w-20 h-20 p-3 mx-2 bg-white border border-gray-300 rounded-md lg:h-24 lg:w-24"
                            />
                        </Link>
                    )
                })}
            </Marquee>
        </div>
    )
}

export default RandomTeamMarquee
