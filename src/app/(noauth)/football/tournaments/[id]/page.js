import React from 'react'
import { notFound } from "next/navigation"
import Link from 'next/link'
import TournamentsDropdown from '@/components/TournamentsDropdown'
import BackToHomeButton from '@/components/BackToHomeButton'
import Image from 'next/image'

async function getTournamentInformation(id) {  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tournaments/` + id, {
        next: {
            revalidate: 60
        }
    })

    if (!res.ok) {
        notFound()
    }

    return res.json()
}

async function getTournamentRounds(id) {  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tournaments/` + id + `/rounds/numbers`, {
        next: {
            revalidate: 60
        }
    })

    return res.json()
}

async function getTournamentGames(id) {  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tournaments/` + id + `/games`, {
        next: {
            revalidate: 60
        }
    })

    return res.json()
}

function formatGameDate(value) {
    const dateObj = new Date(value)
    const day = dateObj.getDate() + 1
    const month = dateObj.toLocaleString("default", { month: "short" })
    const year = dateObj.getFullYear()

    return (
        <div className="text-xs text-gray-500">{month} {day}, {year}</div>
    )
}

function formatLocation(value) {
    if (value.length > 14) {
        return value.substring(0, 14) + '...'
    } else {
        return value
    }
}

export default async function Tournament({ params }) {
    const tournamentInformation = await getTournamentInformation(params.id)
    const tournamentRounds = await getTournamentRounds(params.id)
    const tournamentGames = await getTournamentGames(params.id)

    return (
            <main>
                <div className="p-4 mx-auto mt-4 md:p-0 md:mt-16 max-w-7xl">
                    <div className="space-y-4 md:mx-12">
                        <BackToHomeButton />
                        <div className="w-full bg-white border border-gray-300 rounded-md shadow-md min-h-20">
                            <div className="items-center justify-between p-4 border-b border-gray-300 lg:flex md:py-8 md:px-8">
                                <h1 className="text-xl font-semibold">{tournamentInformation.data.name}</h1>
                            </div>

                            <div className="px-4 py-4 text-xl font-semibold border-b md:px-8 bg-gray-950/5">
                                <TournamentsDropdown />
                            </div>

                            <div className="relative overflow-x-scroll">
                    
                                <div className="flex p-8 w-[1214px] -ml-8">

                                    {tournamentRounds.data[0] &&
                                        <div>
                                            <svg className="absolute ml-[195px] mt-[88px]" width="100" height="185" viewBox="0 0 100 199" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="198.5" x2="100" y2="198.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="199" stroke="#DDDDDD"/></svg>
                                            <svg className="absolute ml-[195px] mt-[448px]" width="100" height="185" viewBox="0 0 100 199" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="198.5" x2="100" y2="198.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="199" stroke="#DDDDDD"/></svg>
                                            <svg className="absolute ml-[195px] mt-[808px]" width="100" height="185" viewBox="0 0 100 199" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="198.5" x2="100" y2="198.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="199" stroke="#DDDDDD"/></svg>
                                            <svg className="absolute ml-[195px] mt-[1169px]" width="100" height="185" viewBox="0 0 100 199" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="198.5" x2="100" y2="198.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="199" stroke="#DDDDDD"/></svg>
                                            <svg className="absolute ml-[195px] mt-[1528px]" width="100" height="185" viewBox="0 0 100 199" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="198.5" x2="100" y2="198.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="199" stroke="#DDDDDD"/></svg>
                                            <svg className="absolute ml-[195px] mt-[1887px]" width="100" height="185" viewBox="0 0 100 199" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="198.5" x2="100" y2="198.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="199" stroke="#DDDDDD"/></svg>
                                            <svg className="absolute ml-[195px] mt-[2247px]" width="100" height="185" viewBox="0 0 100 199" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="198.5" x2="100" y2="198.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="199" stroke="#DDDDDD"/></svg>
                                            <svg className="absolute ml-[195px] mt-[2608px]" width="100" height="185" viewBox="0 0 100 199" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="198.5" x2="100" y2="198.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="199" stroke="#DDDDDD"/></svg>

                                            <svg className="absolute ml-[420px] mt-[179px]" width="100" height="360" viewBox="0 0 100 393" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="392.5" x2="100" y2="392.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="393" stroke="#DDDDDD"/></svg>
                                            <svg className="absolute ml-[420px] mt-[900px]" width="100" height="360" viewBox="0 0 100 393" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="392.5" x2="100" y2="392.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="393" stroke="#DDDDDD"/></svg>
                                            <svg className="absolute ml-[420px] mt-[1618px]" width="100" height="360" viewBox="0 0 100 393" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="392.5" x2="100" y2="392.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="393" stroke="#DDDDDD"/></svg>
                                            <svg className="absolute ml-[420px] mt-[2339px]" width="100" height="360" viewBox="0 0 100 393" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="392.5" x2="100" y2="392.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="393" stroke="#DDDDDD"/></svg>

                                            <svg className="absolute ml-[655px] mt-[360px]" width="100" height="720" viewBox="0 0 100 751" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="750.5" x2="100" y2="750.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="751" stroke="#DDDDDD"/></svg>
                                            <svg className="absolute ml-[655px] mt-[1800px]" width="100" height="720" viewBox="0 0 100 751" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="750.5" x2="100" y2="750.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.5" y2="751" stroke="#DDDDDD"/></svg>

                                            <svg className="absolute ml-[885px] mt-[720px]" width="100" height="1440" viewBox="0 0 100 1501" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="100" y2="0.5" stroke="#DDDDDD"/><line y1="1500.5" x2="100" y2="1500.5" stroke="#DDDDDD"/><line x1="99.5" y1="1" x2="99.4999" y2="1501" stroke="#DDDDDD"/></svg>
                                        </div>

                                    }

                                    {tournamentRounds.data.map((round) => {
                                        return (
                                            <>
                                                <ul key={round} className="z-10 flex flex-col justify-around w-1/5 mx-8" id={round}>
                                                    {tournamentGames.data.map(game => {
                                                        return (
                                                            game.round === round &&
                                                            <>
                                                                {game.hide_game_from_bracket ?
                                                                
                                                                    <li id={game.id} key={game.id} className="my-4 h-[148px] w-[166px] bg-white border border-gray-300 rounded border-dashed"></li>

                                                                :

                                                                    <li id={game.id} key={game.id} className="my-4 bg-white border border-gray-300 rounded shadow">
                                                                        <div className="flex items-center justify-between p-2 space-x-2 border-b border-gray-300 bg-sky-950/5">
                                                                            <div className="text-xs italic text-gray-500">{formatGameDate(game.game.game_date)}</div>
                                                                        </div>
                                                                        <div className={`p-2 flex items-center justify-between text-xs ${parseInt(game.game.away_team_final_score) > parseInt(game.game.home_team_final_score) ? 'font-semibold' : ''}`}>
                                                                            <div className="flex items-center space-x-2">
                                                                                <div>
                                                                                    <Image
                                                                                        src={`${game.game.away_team.logo}`}
                                                                                        height={24}
                                                                                        width={24}
                                                                                        alt={`${game.game.away_team.name}`}
                                                                                        title={`${game.game.away_team.name}`}
                                                                                    />
                                                                                </div>
                                                                                <div><Link href={`/football/${game.game.away_team.slug}/${game.game.school_year.year}`}>{game.game.away_team.name.substring(0, 10) + '...'}</Link></div>
                                                                            </div>
                                                                            <div>{game.game.away_team_final_score}</div>
                                                                        </div>
                                                                        <div className={`p-2 flex items-center justify-between text-xs ${parseInt(game.game.away_team_final_score) > parseInt(game.game.home_team_final_score) ? '' : 'font-semibold'}`}>
                                                                            <div className="flex items-center space-x-2">
                                                                                <div>
                                                                                    <Image
                                                                                        src={`${game.game.home_team.logo}`}
                                                                                        height={24}
                                                                                        width={24}
                                                                                        alt={`${game.game.home_team.name}`}
                                                                                        title={`${game.game.home_team.name}`}
                                                                                    />
                                                                                </div>
                                                                                <div><Link href={`/football/${game.game.home_team.slug}/${game.game.school_year.year}`}>{game.game.home_team.name.substring(0, 10) + '...'}</Link></div>
                                                                            </div>  
                                                                            <div>{game.game.home_team_final_score}</div>
                                                                        </div>
                                                                        <div className="flex items-center justify-between p-2 space-x-2 border-t border-gray-300 bg-sky-950/5">
                                                                            <div className="text-xs italic text-gray-500">{!game.game.neutral_location_name ? `@ ${formatLocation(game.game.home_team.name)}`  : `${formatLocation(game.game.neutral_location_name)}`}</div>
                                                                        </div>
                                                                    </li>

                                                                }
                                                            
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </>
                                            
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
    )
}