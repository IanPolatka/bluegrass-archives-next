"use client"

import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import GuestGameDetails from './GuestGameDetails'

export default function GuestFuture() {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getGames()
        const interval = setInterval(() => {
            getGames()
        }, 30000);
        return () => clearInterval(interval);
    }, [])

    const getGames = () => {
        setLoading(true)
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/football/future`)
            .then(({data}) => {
                setGames(data.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    function formatGameDate(value) {
        const dateObj = new Date(value);
        dateObj.setDate(dateObj.getDate() + 1)
        const dayName = dateObj.toLocaleString("default", { weekday: "long" });
        dateObj.setDate(dateObj.getDate() - 1)
        const day = dateObj.getDate() + 1;
        const month = dateObj.toLocaleString("default", { month: "long" });
        const year = dateObj.getFullYear();
    
        return (
            <div className="mb-4 font-semibold text-black">{dayName}, {month} {day}, {year}</div>
        )
    }

    return (
        <div>
            <div className="mx-auto max-w-7xl">
                <div className="space-y-4">
                    <div className="md:py-2 md:mx-8">
                        {games.length > 0 &&
                            <div className="m-4 my-4 bg-white border rounded-md shadow-md">
                                <div className="px-4 pt-4">{formatGameDate(games[0].game_date)}</div>
                                <div className="divide-y-[1px] divide-gray-300 border-t">
                                    <div className="gap-4 m-4 space-y-4 text-sm sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                                        {games.map((game, index) => {
                                            return (
                                                <GuestGameDetails key={index} game={game} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}