"use client"

import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Link from 'next/link'
import Image from 'next/image'

import React from 'react'
import FavoriteTeamsModal from './FavoriteTeamsModal'

export default function UserHeroSection({user}) {
    const [games, setGames] = useState([])
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        getGames()
        getFavoritesById()
        const interval = setInterval(() => {
            getGames()
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    const getGames = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/favorites/football/games`)
            .then(({data}) => {
                setGames(data.data)
            })
            .catch(() => {

            })
    }

    const getFavoritesById = () => {

        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/favorites/ids`)
            .then(({data}) => {
                setFavorites(data.data)

            })
            .catch(() => {

            })
    }

    function formatGameDate(value) {
        const dateObj = new Date(value)
        dateObj.setDate(dateObj.getDate() + 1)
        const dayName = dateObj.toLocaleString("default", { weekday: "long" })
        dateObj.setDate(dateObj.getDate() - 1)
        const day = dateObj.getDate() + 1
        const month = dateObj.toLocaleString("default", { month: "long" })
        const year = dateObj.getFullYear()
    
        return (
            <div className="mb-4 font-semibold text-green-600">{dayName}, {month} {day}, {year}</div>
        )
    }

    return (
        <div className="mx-auto mt-8 md:mt-12 max-w-7xl">
            <div className="space-y-4">
                <div className="md:py-2 md:mx-8">
                    <h1 className="flex items-center mx-4 text-2xl font-semibold"><span className="mr-4 text-3xl">👋</span>Hello, {user.name}</h1>
                    
                        <div className="m-4 my-4 bg-white border rounded-md shadow-md">
                            <div className="">
                                <div className="m-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h2 className="flex items-center space-x-4 text-xl font-semibold">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2 fill-yellow-400 icon icon-tabler icons-tabler-filled icon-tabler-star">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"></path>
                                            </svg>
                                            Your Favorites
                                        </h2>
                                        <FavoriteTeamsModal getGames={getGames} />
                                    </div>
                                    <p className="text-gray-500">The most recent games of your favorite teams</p>
                                </div>
                                <div className="gap-4 m-4 space-y-4 text-sm sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                                    {games.map((game, index) => {
                                        return (
                                            <div key={index} className={`p-4 space-y-2 font-semibold border-[1px] rounded-md border-green-600 bg-green-50/50`}>
                                                <div>
                                                    <div className="">{formatGameDate(game.game_date)}</div>
                                                    {game.is_winner_set == 'set' &&
                                                        <div className="text-xs text-right uppercase">Final</div>}
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                <div className={`h-[48px] w-[48px] bg-${game.away_team.team_color}-600/10 rounded-full p-2`}>
                                                                    <Image
                                                                        src={`${game.away_team.logo}`}
                                                                        height={60}
                                                                        width={60}
                                                                        alt={`${game.away_team.name}`}
                                                                        title={`${game.away_team.name}`}
                                                                    />
                                                                </div>
                                                                <div className="items-center">
                                                                    <div className="flex items-center">
                                                                        <Link href={`/football/${game.away_team.slug}/${game.school_year.year}`}>
                                                                            <span className='font-semibold'>{game.away_team.name}</span>
                                                                        </Link> {favorites.includes(game.away_team.id) && <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="fill-cyan-700"  className="ml-2 icon icon-tabler icons-tabler-filled icon-tabler-star fill-amber-400"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500">{game.away_team.mascot}</div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {game.away_team_final_score ?
                                                                    <div className="font-semibold">{game.away_team_final_score}</div>
                                                                :
                                                                    <div className="font-semibold">-</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                <div className={`h-[48px] w-[48px] bg-${game.home_team.team_color}-600/10 rounded-full p-2`}>
                                                                    <Image
                                                                        src={`${game.home_team.logo}`}
                                                                        height={60}
                                                                        width={60}
                                                                        alt={`${game.home_team.name}`}
                                                                        title={`${game.home_team.name}`}
                                                                    />
                                                                </div>
                                                                <div className="items-center">
                                                                    <div className="flex items-center">
                                                                        <Link href={`/football/${game.home_team.slug}/${game.school_year.year}`}>
                                                                            <span className='font-semibold'>{game.home_team.name} </span>
                                                                        </Link> {favorites.includes(game.home_team.id) && <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="fill-cyan-700"  className="ml-2 icon icon-tabler icons-tabler-filled icon-tabler-star fill-amber-400"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500">{game.home_team.mascot}</div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {game.away_team_final_score ?
                                                                    <div className="font-semibold">{game.home_team_final_score}</div>
                                                                :
                                                                    <div className="font-semibold">-</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
    )
}