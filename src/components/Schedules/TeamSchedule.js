"use client"

import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Link from 'next/link'
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { useParams } from 'next/navigation'
import React from 'react'
import Image from 'next/image'

export default function TeamSchedule({params}) {
    const {slug, year} = useParams()
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getGames()
    }, [slug, year])

    const getGames = () => {
        setLoading(true)
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/football/schedule/` + slug + `/` + year)
            .then(({data}) => {
                setGames(data.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    function formatDate(value) {
        dayjs.extend(advancedFormat)
        const month = dayjs(value).format('MMM')
        const day = dayjs(value).format('Do')
        const year = dayjs(value).format('YYYY')
        return (
            <div className="text-sm text-center leading-1"><div className="mr-4 text-gray-500 dark:text-gray-200">{month}</div><div className="mr-4 text-sm font-bold dark:text-white">{day}</div><div className="mr-4 text-gray-500 dark:text-gray-200">{year}</div></div>
        )
    }

    function formatDateMobile(value) { 
        dayjs.extend(advancedFormat) 
        const date =  dayjs(value).format('MMMM Do, YYYY')
        return (
            <div className="text-sm text-gray-500">{date}</div>
        )
    }
    
    function finalScore(homescore, awayscore) {
        let score = ''
        if (parseInt(awayscore) > parseInt(homescore)) {
            score = awayscore + '-' + homescore
        } else {
            score = homescore + '-' + awayscore
        }
    
        return score;
    }
    
    function setFinalStatus(winner="", loser="", currentTeam) {
        if (currentTeam === winner) {
            return <div className="px-2 py-1 mr-2 text-xs font-semibold text-green-600 uppercase rounded-md bg-green-600/10">Won</div>
        } else if (currentTeam === loser) {
            return <div className="px-2 py-1 mr-2 text-xs font-semibold text-red-600 uppercase rounded-md bg-red-600/10">Loss</div>
        } else {
            return "";
        }
    }

    const gamesLoadingIndicator = [];
    for (let i = 0; i < 8; i++) {
        gamesLoadingIndicator.push(
            <div>
                <div key={i} className={`hidden px-4 py-4 border-b border-gray-300 border-dashed last:border-none md:block md:px-8 ${i == 7 && 'border-none'}`}>
                    <div className="items-center hidden md:flex">
                        <div className="flex items-center w-full group">
                            <div role="status" className="w-10 mx-auto mr-2 text-center animate-pulse">
                                <div className="w-3/5 h-3 mx-auto mb-1 bg-gray-200 rounded-full"></div>
                                <div className="w-4/5 h-4 mx-auto mb-1 bg-gray-200 rounded-full"></div>
                                <div className="w-3/5 h-3 mx-auto bg-gray-200 rounded-full"></div>
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div>
                                <div className="w-12 h-12 mr-4 bg-gray-200 rounded-md flex- animate-pulse"></div>
                            </div>
                            <div className="flex justify-between flex-grow">
                                <div role="status" className="mr-2 animate-pulse">
                                    <div className="w-48 h-4 mb-2 bg-gray-200 rounded-full"></div>
                                    <div className="w-32 h-3 bg-gray-200 rounded-full"></div>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status" className="flex-col animate-pulse">
                                    <div className="w-20 h-4 mb-2 bg-gray-200 rounded-full justify-self-end"></div>
                                    <div className="w-24 h-4 bg-gray-200 rounded-full"></div>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div key={i + 100} className={`flex px-4 py-4 border-b border-gray-300 border-dashed md:hidden ${i == 7 && 'border-none'}`}>
                    <div className="flex w-full">
                        <div className="w-12 h-12 mr-4 bg-gray-200 rounded-md flex- animate-pulse"></div>
                        <div className="flex-1 space-y-4">
                            <div className="w-48 h-3 bg-gray-200 rounded-full"></div>
                            <div className="w-32 h-5 bg-gray-200 rounded-full"></div>
                            <div className="w-56 h-3 bg-gray-200 rounded-full"></div>
                            <div className="w-20 h-4 bg-gray-200 rounded-full"></div>
                            <div className="w-24 h-3 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (loading) return (
        <div>{gamesLoadingIndicator}</div>
    )

    return (
        <div className="divide-y divide-gray-300 divide-dashed">
            {games.map((game, index) => {
                return (
                    <div key={index}>
                    <div className="">
                        <div className={game.away_team.slug === slug && !game.neutral_location_name ? 'hidden md:block away-game px-4 md:px-8 py-4' : 'hidden md:block px-4 md:px-8 py-4'}>
                            <div className="items-center justify-between hidden md:flex">
                                <div className="flex items-center group">
                                    {formatDate(game.game_date)}
                                        {game.away_team.slug === slug ?
                                            <Image
                                                src={`${game.home_team.logo}`}
                                                height={48}
                                                width={48}
                                                alt={`${game.home_team.logo}`}
                                                title={`${game.home_team.logo}`}
                                                className={`w-12 h-12 mr-4 rounded-md ${game.home_team.logo.includes('tba.png') ? 'border border-dashed rounded-md border-gray-300' : ''}`}
                                            />
                                        : 
                                            <Image
                                                src={`${game.away_team.logo}`}
                                                height={48}
                                                width={48}
                                                alt={`${game.away_team.logo}`}
                                                title={`${game.away_team.logo}`}
                                                className={`w-12 h-12 mr-4 rounded-md ${game.away_team.logo.includes('tba.png') ? 'border border-dashed rounded-md border-gray-300' : ''}`}
                                            />
                                    }
                                    {game.away_team.slug === slug ? 
                                        <div>{game.home_team.state === 'KY' ?
                                            <div>
                                                {game.neutral_location_name && <div className="inline-flex px-2 py-1 mr-2 text-xs font-semibold uppercase rounded-md text-amber-600 bg-amber-600/10">{game.neutral_location_name}</div>}
                                                <div><span className={`px-1 mr-2 text-xs leading-relaxed border rounded ${game.neutral_location_name ? 'bg-white border-gray-300' : 'bg-slate-900 border-slate-900 text-white font-semibold'}`}>{game.neutral_location_name ? 'VS' : 'AT' }</span><Link className="dark:text-white" href={`/football/${game.home_team.slug}/${year}`}><strong>{game.home_team.name}</strong> ({game.home_team.city}, {game.home_team.state})</Link><br /><div className="text-gray-500">{game.home_team.mascot}</div></div>
                                            </div>
                                            : 
                                            <div>
                                                {game.neutral_location_name && <div className="inline-flex px-2 py-1 mr-2 text-xs font-semibold uppercase rounded-md text-amber-600 bg-amber-600/10">{game.neutral_location_name}</div>}
                                                <div className="inline dark:text-white"><span className={`px-1 mr-2 text-xs leading-relaxed border rounded ${game.neutral_location_name ? 'bg-white border-gray-300' : 'bg-slate-900 border-slate-900 text-white font-semibold'}`}>{game.neutral_location_name ? 'VS' : 'AT' }</span><strong>{game.home_team.name}</strong> ({game.home_team.city}, {game.home_team.state})<br /><div className="text-gray-500 dark:text-gray-200">{game.home_team.mascot}</div></div>
                                            </div>
                                        }</div>
                                        : <div>{game.away_team.state === 'KY' ?
                                            <div>
                                                {game.neutral_location_name && <div className="inline-flex px-2 py-1 mr-2 text-xs font-semibold uppercase rounded-md text-amber-600 bg-amber-600/10">{game.neutral_location_name}</div>}
                                                <div><span className="px-1 mr-2 text-xs leading-relaxed bg-white border border-gray-300 rounded">VS</span><Link className="dark:text-white" href={`/football/${game.away_team.slug}/${year}`}><strong>{game.away_team.name}</strong> ({game.away_team.city}, {game.away_team.state})</Link><br /><div className="text-gray-500">{game.away_team.mascot}</div></div>
                                            </div>
                                            : 
                                            <div>
                                                {game.neutral_location_name && <div className="inline-flex px-2 py-1 mr-2 text-xs font-semibold uppercase rounded-md text-amber-600 bg-amber-600/10">{game.neutral_location_name}</div>}
                                                <div className="inline dark:text-white"><span className="px-1 mr-2 text-xs leading-relaxed bg-white border border-gray-300 rounded">VS</span><strong>{game.away_team.name}</strong> ({game.away_team.city}, {game.away_team.state})<br /><div className="text-gray-500 dark:text-gray-200">{game.away_team.mascot}</div></div>
                                            </div>
                                        }</div>
                                    }
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            {game.the_winner && <div>{setFinalStatus(game.the_winner.slug, game.the_loser.slug, slug)} <strong className="dark:text-white">{finalScore(game.home_team_final_score, game.away_team_final_score)}</strong></div>}
                                        </div>
                                        <div className="flex justify-end text-sm">
                                            {game.away_team.slug === slug ?
                                                <Link href={`/football/history/${game.away_team.slug}/${game.home_team.slug}`} className="flex items-center text-sm font-semibold transition duration-150 ease-in text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-500">
                                                View History
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M5 12l14 0"></path>
                                                    <path d="M15 16l4 -4"></path>
                                                    <path d="M15 8l4 4"></path>
                                                </svg>
                                                </Link>
                                            : 
                                                <Link href={`/football/history/${game.home_team.slug}/${game.away_team.slug}`} className="flex items-center text-sm font-semibold transition duration-150 ease-in text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-500">
                                                View History
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M5 12l14 0"></path>
                                                    <path d="M15 16l4 -4"></path>
                                                    <path d="M15 8l4 4"></path>
                                                </svg>
                                                </Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            {game.tournament_id && <em><Link className="block w-full px-4 py-2 mt-4 text-xs font-semibold text-center uppercase transition duration-150 ease-in border rounded-md text-sky-600 border-sky-600" href={`/football/tournaments/${game.tournament.id}`}>{game.tournament.name}</Link></em>}
                        </div>
                    </div>

                    <div className={game.away_team.slug === slug && !game.neutral_location_name ? "flex md:hidden px-4 py-4 away-game" : "flex md:hidden px-4 py-4"}>
                        <div className="flex w-full">
                            <div className="w-12 mr-4">
                                {game.away_team.slug === slug ?
                                    <Image
                                        src={`${game.home_team.logo}`}
                                        height={48}
                                        width={48}
                                        alt={`${game.home_team.logo}`}
                                        title={`${game.home_team.logo}`}
                                        className={`w-12 h-12 mr-4 rounded-md ${game.home_team.logo.includes('tba.png') ? 'border border-dashed rounded-md border-gray-300' : ''}`}
                                    />
                                : 
                                    <Image
                                        src={`${game.away_team.logo}`}
                                        height={48}
                                        width={48}
                                        alt={`${game.away_team.logo}`}
                                        title={`${game.away_team.logo}`}
                                        className={`w-12 h-12 mr-4 rounded-md ${game.away_team.logo.includes('tba.png') ? 'border border-dashed rounded-md border-gray-300' : ''}`}
                                    />
                                }
                            </div>
                            <div className="flex-1 space-y-2">
                                {game.neutral_location_name && <div className="inline-flex px-2 py-1 mr-2 text-xs font-semibold uppercase rounded-md text-amber-600 bg-amber-600/10">{game.neutral_location_name}</div>}
                                <div>{formatDateMobile(game.game_date)}</div>
                                {game.away_team.slug === slug ? 
                                    <div>{game.home_team.state === 'KY' ?
                                        <div className="flex items-center"><span className={`px-1 mr-2 text-xs font-semibold leading-relaxed border rounded ${game.neutral_location_name ? 'text-black border-gray-300' : 'text-white bg-slate-900 border-slate-900'}`}>{game.neutral_location_name ? 'VS' : 'AT' }</span><Link href={`/football/${game.home_team.slug}/${year}`}><strong>{game.home_team.name}</strong> ({game.home_team.city}, {game.home_team.state})</Link></div>
                                        : <div className="inline"><span className={`px-1 mr-2 text-xs font-semibold leading-relaxed border rounded ${game.neutral_location_name ? 'text-black border-gray-300' : 'text-white bg-slate-900 border-slate-900'}`}>{game.neutral_location_name ? 'VS' : 'AT' }</span><strong>{game.home_team.name}</strong> ({game.home_team.city}, {game.home_team.state})</div>
                                    }</div>
                                : <div>{game.away_team.state === 'KY' ?
                                    <div className="flex items-center"><span className="px-1 mr-2 text-xs font-semibold leading-relaxed text-black border border-gray-300 rounded">VS</span><Link href={`/football/${game.away_team.slug}/${year}`}><strong>{game.away_team.name}</strong> ({game.away_team.city}, {game.away_team.state})</Link></div>
                                        : <div className="inline"><span className="px-1 mr-2 text-xs font-semibold leading-relaxed text-black border border-gray-300 rounded">VS</span><strong>{game.away_team.name}</strong> ({game.away_team.city}, {game.away_team.state})</div>
                                    }</div>
                                }
                                {game.away_team.slug === slug ?
                                    <div className="text-gray-500">{game.home_team.mascot}</div>
                                :
                                    <div className="text-gray-500">{game.away_team.mascot}</div>
                                }
                                <div className="flex items-center mt-2 font-semibold">
                                    {game.the_winner && <div>{setFinalStatus(game.the_winner.slug, game.the_loser.slug, slug)} {finalScore(game.home_team_final_score, game.away_team_final_score)}</div>}
                                </div>
                                <div className="flex text-sm">
                                    {game.away_team.slug === slug ?
                                        <Link href={`/football/histroy/${game.away_team.slug}/${game.home_team.slug}`} className="flex items-center text-sm font-semibold transition duration-150 ease-in text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-500">
                                            View History
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M5 12l14 0"></path>
                                                <path d="M15 16l4 -4"></path>
                                                <path d="M15 8l4 4"></path>
                                            </svg>
                                        </Link>
                                    : 
                                        <Link href={`/football/history/${game.home_team.slug}/${game.away_team.slug}`} className="flex items-center text-sm font-semibold transition duration-150 ease-in text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-500">
                                            View History
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M5 12l14 0"></path>
                                                <path d="M15 16l4 -4"></path>
                                                <path d="M15 8l4 4"></path>
                                            </svg>
                                        </Link>
                                    }
                                </div>
                                {game.tournament_id && <em><Link className="block px-4 py-2 mt-4 text-xs font-semibold text-center uppercase transition duration-150 ease-in border rounded-md text-sky-600 border-sky-600" href={`/football/tournaments/${game.tournament.id}`}>{game.tournament.name}</Link></em>}
                            </div>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
    )
}