import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

async function getStandings(slug, year) {    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/football/classes/` + slug + '/' + year, {
        next: {
            revalidate: 60
        }
    })

    return res.json()
}

export default async function TeamClassStandings({slug, year}) {
    const standings = await getStandings(slug, year)

    return (
        <div className="bg-white border border-gray-300 rounded-md">
            <h2 className="p-4 text-lg font-semibold border-b border-gray-300 md:py-6">{year} KHSAA Standings</h2>
            <div className="px-4 py-2 border-b border-gray-300 bg-sky-950/5">
                <div className="flex justify-between text-gray-500">
                    <div className="text-xs uppercase">Team</div>
                    <div className="text-xs uppercase">Overall Record</div>
                </div>
            </div>
            {standings.data.map((team, index) => (
                <div key={index} className="px-4 py-2 border-b border-gray-300 border-dashed last:border-0">
                    <div className="flex items-center text-base">
                        <Image 
                            className="w-8 h-8 mr-2 dark:h-12 dark:w-12 dark:p-2 dark:bg-slate-900 dark:rounded"
                            width={32}
                            height={32} 
                            alt={team.TeamName} 
                            title={team.TeamName} 
                            src={team.TeamLogo} />
                        <div className="flex items-center justify-between w-full">
                            <div className="items-center">
                                <Link slug="cooper-jaguars" className="text-sm font-semibold" href={`/football/${team.TeamSlug}/${year}`}>{team.Team}</Link>
                                <div className="text-sm text-gray-400">{team.TeamMascot}</div>
                            </div>
                            <div>
                                <strong>{team.Wins}-{team.Losses}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {standings.data.length === 0 && (
                <p className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase">Class is empty</p>
            )}
        </div>
    )
}
