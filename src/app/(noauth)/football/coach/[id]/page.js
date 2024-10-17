import React from 'react'
import BackToHomeButton from '@/components/BackToHomeButton'
import Image from 'next/image'
import Link from 'next/link'

async function getCoachSummary(id) {    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coaches/` + id + '/summary', {
        next: {
            revalidate: 60
        }
    })

    return res.json()
}

async function getTeamSummary(id) {    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coaches/` + id + '/team-summary', {
        next: {
            revalidate: 60
        }
    })

    return res.json()
}

export async function generateMetadata({ params }) {
    const coachSummary = await getCoachSummary(params.id)

    return {
        title: 'Bluegrass Archives - ' + coachSummary.data[0].Coach.name,
        description: 'Bluegrass Archives - KHSAA Summary of coach ' + coachSummary.data[0].Coach.name
    }
}

export default async function CoachSummary({ params }) {
    const coachSummary = await getCoachSummary(params.id)
    const teamsSummary = await getTeamSummary(params.id)

    return (
        <main>
            <div className="p-4 mx-auto mt-4 md:p-0 md:mt-16 max-w-7xl">
                <div className="space-y-4 md:mx-12">
                    <BackToHomeButton />
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="col-span-4 mb-4">
                            <div className="bg-white border border-gray-300 rounded-md">

                                    <div className="p-4 space-y-4 divide-y-[1px] divide-dashed divide-gray-300">
                                        <div>
                                            <div className="text-sm text-gray-500">Coach Name</div>
                                            <h1 className="text-lg font-semibold">{coachSummary.data[0].Coach.name}</h1>
                                        </div>
                                        <div className="pt-4">
                                            <div className="text-sm text-gray-500">KHSAA Seasons</div>
                                            <h3 className="text-lg font-semibold">{coachSummary.data[0]["Total Seasons"]}</h3>
                                        </div>
                                        <div className="pt-4">
                                            <div className="text-sm text-gray-500">Total Wins</div>
                                            <h3 className="text-lg font-semibold">{coachSummary.data[0]["Total Wins"]}</h3>
                                        </div>
                                        <div className="pt-4">
                                            <div className="text-sm text-gray-500">Total Losses</div>
                                            <h3 className="text-lg font-semibold">{coachSummary.data[0]["Total Losses"]}</h3>
                                        </div>
                                    </div>

                            </div>
                        </div>
                        <div className="col-span-8">
                            <div className="bg-white border border-gray-300 rounded-md">
                                <h1 className="p-4 text-lg font-semibold">Coaching History In The KHSAA</h1>
                                <div className="px-4 py-2 border-t border-b border-gray-300 bg-sky-950/5">
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-3 text-xs uppercase">School Year</div>
                                        <div className="col-span-6 text-xs uppercase">Team</div>
                                        <div className="col-span-3 text-xs uppercase">Record</div>
                                    </div>
                                </div>
                                <div className="divide-y-[1px] divide-dashed divide-gray-300">
                                    {teamsSummary.data.map((team, index) => (
                                        <div key={index} className="flex grid items-center grid-cols-12 gap-4 px-4 py-4">
                                            <div className="col-span-3">{team.Year.year}</div>
                                            <div className="flex items-center col-span-6 space-x-4">
                                                <div>
                                                <Image
                                                    src={`${team.Team.logo}`}
                                                    height={48}
                                                    width={48}
                                                    alt={`${team.Team.name}`}
                                                    title={`${team.Team.name}`}
                                                /> 
                                                </div>
                                                <div className="space-y-.5">
                                                    <Link className="font-semibold" href={`/football/${team.Team.slug}/${team.Year.year}`}>{team.Team.name}</Link>
                                                    <div className="text-sm text-gray-500">{team.Team.mascot}</div>
                                                </div>
                                            </div>
                                            <div className="col-span-3">{team.Wins} - {team.Losses}</div>
                                        </div>
                                    ))}
                                 </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}