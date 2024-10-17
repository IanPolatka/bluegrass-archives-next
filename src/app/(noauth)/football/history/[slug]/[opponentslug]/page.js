import React from 'react'
import { notFound } from "next/navigation"
import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import BackToHomeButton from '@/components/BackToHomeButton'

async function getTeamHistory(slug, opponentslug) {  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/football/history/` + slug + '/' + opponentslug, {
        next: {
            revalidate: 60
        }
    })

    if (!res.ok) {
        notFound()
    }

    return res.json()
}

async function getGames(slug, opponentslug) {  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/football/history/` + slug + '/' + opponentslug + '/games', {
        next: {
            revalidate: 60
        }
    })

    return res.json()
}

function formatDate(value) { 
    dayjs.extend(advancedFormat) 
    const date =  dayjs(value).format('MMMM Do, YYYY')
    return (
        <div className="text-sm text-gray-500">{date}</div>
    )
}

export async function generateMetadata({ params }) {
    const history = await getTeamHistory(params.slug, params.opponentslug)

    return {
        title: 'Bluegrass Archives - Football History ' + history.data[0].Team.name + ' vs ' + history.data[0].Opponent.name,
        description: 'Historical information between ' + history.data[0].Team.name + ' and ' + history.data[0].Opponent.name,
        openGraph: {
            title: 'Bluegrass Archives - Football History ' + history.data[0].Team.name + ' vs ' + history.data[0].Opponent.name,
            url: '/football/history/' + history.data[0].Team.slug + '/' + history.data[0].Opponent.slug,
            images: [
                {
                    url: history.data[0].Team.logo
                }
            ],
        },
    }
}


export default async function FootballHistory({ params }) {
    const history = await getTeamHistory(params.slug, params.opponentslug)
    const games = await getGames(params.slug, params.opponentslug)

    return (

            <main>
                <div className="p-4 mx-auto mt-4 md:p-0 md:mt-16 max-w-7xl">
                    <div className="md:mx-12">
                        <BackToHomeButton />
                        <div className="w-full mt-4 mb-8 bg-white border border-gray-300 rounded-md shadow-md min-h-20">
                            <div className="px-4 pt-4 lg:px-8 lg:pt-8">
                                <h1 className="mb-8 text-xl font-semibold">
                                    Summary of <Link className="font-semibold transition duration-150 ease-in hover:text-blue-600" href={`/football/${history.data[0].Team.slug}/2024-2025`}>{history.data[0].Team.name}</Link> and <Link className="font-semibold transition duration-150 ease-in hover:text-blue-600" href={`/football/${history.data[0].Opponent.slug}/2024-2025`}>{history.data[0].Opponent.name}</Link>
                                </h1>
                            </div>
                            <div className="flex justify-between px-8 mb-4">
                                <div className="self-center justify-center mx-auto">
                                    <div className="w-16 h-16 mx-auto mb-4 border rounded-md md:w-44 md:h-44">
                                        <Link href={`/football/${history.data[0].Team.slug}/2024-2025`}>
                                            <Image
                                                src={`${history.data[0].Team.logo}`}
                                                height={164}
                                                width={164}
                                                className="p-2 md:p-8"
                                                alt={`${history.data[0].Team.name} ${history.data[0].Team.mascot}`}
                                            />
                                        </Link>
                                    </div>
                                    <div className="text-center">
                                        <Link href={`/football/${history.data[0].Team.slug}/2024-2025`}>
                                            <div className="font-semibold">{history.data[0].Team.name}</div>
                                        </Link>
                                        <div className="text-gray-500">({history.data[0].Team.city}, {history.data[0].Team.state})</div>
                                        <div className="text-gray-500">{history.data[0].Team.mascot}</div>
                                    </div>
                                </div>
                                <div className="flex self-center justify-center mx-auto">
                                    <div className="items-center justify-center top-1/2 left-1/2 bottom-1/2">
                                        <div className="justify-center items-center flex h-12 w-12 text-center text-xl bg-[#fafafa] rounded-full border border-gray-300">vs</div>
                                    </div>
                                </div>
                                <div className="self-center justify-center mx-auto">
                                    <div className="w-16 h-16 mx-auto mb-4 border rounded-md md:w-44 md:h-44">
                                        <Link href={`/football/${history.data[0].Opponent.slug}/2024-2025`}>
                                            <Image
                                                src={`${history.data[0].Opponent.logo}`}
                                                height={164}
                                                width={164}
                                                className="p-2 md:p-8"
                                                alt={`${history.data[0].Opponent.name} ${history.data[0].Opponent.mascot}`}
                                            />
                                        </Link>
                                    </div>
                                    <div className="text-center">
                                        <Link href={`/football/${history.data[0].Opponent.slug}/2024-2025`}>
                                            <div className="font-semibold">{history.data[0].Opponent.name}</div>
                                        </Link>
                                        <div className="text-gray-500">({history.data[0].Opponent.city}, {history.data[0].Opponent.state})</div>
                                        <div className="text-gray-500">{history.data[0].Opponent.mascot}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 border-t">
                                <div className="grid grid-cols-3 md:grid-cols-6">
                                    <div className="p-4 py-4 border-b border-r border-gray-300 md:p-8 md:border-b-0">
                                        <div className="text-xs font-normal text-gray-500 uppercase">Overall Record</div>
                                        <div className="text-xl font-semibold">{history.data[0].Wins}-{history.data[0].Losses}</div>
                                    </div>
                                    <div className="p-4 py-4 border-b border-r border-gray-300 md:p-8 md:border-b-0">
                                        <div className="text-xs font-normal text-gray-500 uppercase">Home Record</div>
                                        <div className="text-xl font-semibold">{history.data[0].homeWins}-{history.data[0].homeLoses}</div>
                                    </div>
                                    <div className="p-4 py-4 border-b border-gray-300 md:p-8 md:border-b-0 md:border-r">
                                        <div className="text-xs font-normal text-gray-500 uppercase">Away Record</div>
                                        <div className="text-xl font-semibold">{history.data[0].awayWins}-{history.data[0].awayLoses}</div>
                                    </div>
                                    <div className="p-4 py-4 border-r border-gray-300 md:p-8">
                                        <div className="text-xs font-normal text-gray-500 uppercase">Nuetral Record</div>
                                        <div className="text-xl font-semibold">{history.data[0].neutralWins}-{history.data[0].neutralLoses}</div>
                                    </div>
                                    <div className="p-4 py-4 border-r border-gray-300 md:p-8">
                                        <div className="text-xs font-normal text-gray-500 uppercase">Points For</div>
                                        <div className="text-xl font-semibold">{history.data[0].pointsFor}</div>
                                    </div>
                                    <div className="p-4 py-4 md:p-8 ">
                                        <div className="text-xs font-normal text-gray-500 uppercase">Points Against</div>
                                        <div className="text-xl font-semibold">{history.data[0].pointsAgainst}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mb-8 bg-white border border-gray-300 rounded-md min-h-20">
                                <h4 className="px-4 py-4 text-xl font-semibold border-b border-gray-300 md:px-8">All Matchups</h4>
                                <div className="divide-y divide-dashed">
                                    {games.data.map((game, index) => {
                                        return (
                                            <div className={`flex items-center justify-between px-4 py-4 md:px-8 ${game.away_team.slug === params.slug ? 'bg-gray-50' : ''} last:rounded-b-md`} key={index}>
                                                <div>
                                                    <div className="mb-2">
                                                        {formatDate(game.game_date)}
                                                    </div>
                                                    
                                                        {game.away_team.slug === params.slug ?
                                                            <div className="flex items-center">
                                                                <span className="px-1 mr-2 text-xs font-semibold leading-relaxed text-white border rounded bg-slate-900 border-slate-900">AT</span>
                                                                <Link className="font-semibold" href={`/football/${game.home_team.slug}/${game.school_year.year}`}>{game.home_team.name}</Link>
                                                            </div>
                                                        : 
                                                            <div className="flex items-center">
                                                                <span className="px-1 mr-2 text-xs leading-relaxed bg-white border border-gray-300 rounded">VS</span>
                                                                <Link className="font-semibold" href={`/football/${game.away_team.slug}/${game.school_year.year}`}>{game.away_team.name}</Link>
                                                            </div>
                                                        }
                                                  
                                                </div>
                                                <div className="flex">
                                                    {game.the_winner &&
                                                        <div>
                                                            {game.the_winner.slug === params.slug ?
                                                                <div>
                                                                    <div className="px-2 py-1 mr-2 text-xs font-semibold uppercase rounded-md text-emerald-600 bg-emerald-600/10">Won</div>
                                                                </div>
                                                            :
                                                                <div>
                                                                    <div className="px-2 py-1 mr-2 text-xs font-semibold text-red-600 uppercase rounded-md bg-red-600/10">Loss</div>
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                    {parseInt(game.away_team_final_score) > parseInt(game.home_team_final_score) ?
                                                        <strong>{game.away_team_final_score}-{game.home_team_final_score}</strong>
                                                    :
                                                        <strong>{game.home_team_final_score}-{game.away_team_final_score}</strong>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>              
                            </div>
                        </div>
                    </div>

            </main>

    )
}
