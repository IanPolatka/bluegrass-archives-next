import StandingsClassesDropdown from '@/components/StandingsClassesDropdown'
import StandingsYearsDropdown from '@/components/StandingsYearsDropdown'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from "next/navigation"
import BackToHomeButton from '@/components/BackToHomeButton'

async function getStandings(className, year) {  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/football/classes/standings/` + year + `/` + className, {
        next: {
            revalidate: 60
        }
    })

    if (!res.ok) {
        notFound()
    }

    return res.json()
}

export default async function ClassStandings({params}) {
    const standings = await getStandings(params.className, params.year)
    const theClass = params.className
    const year = params.year

    return (

            <main>
                <div className="p-4 mx-auto mt-4 md:p-0 md:mt-16 max-w-7xl">
                    <div className="space-y-4 md:mx-12">
                        <BackToHomeButton />
                        <div className="w-full mb-8 bg-white border border-gray-300 rounded-md shadow-md min-h-20">
                            <div className="grid items-center grid-cols-1 gap-4 px-4 py-6 lg:px-8 md:grid-cols-2">
                                <h1 className="text-xl font-semibold">Class Standings</h1>
                            </div>
                            <div className="px-4 py-4 text-xl font-semibold border-t border-b border-gray-300 md:px-8 bg-gray-950/5">
                                <div className="grid items-center grid-cols-2 gap-4 md:grid-cols-3">
                                    <div>
                                        <StandingsYearsDropdown />
                                    </div>
                                    <div>
                                        <StandingsClassesDropdown />
                                    </div>
                                </div>
                            </div>
                            <h1 className="px-4 py-6 text-lg font-semibold border-b border-gray-300 sm:px-8 dark:text-white">{year} - {theClass} Class Standings</h1>
                            {standings.data.map((team, index) => {
                                return (
                                        <div key={index} className="grid items-center justify-center grid-cols-1 px-4 py-2 font-semibold border-b border-gray-300 border-dashed sm:px-8 sm:gap-8 dark:text-white sm:grid-cols-2 last:border-none dark:border-slate-700">
                                            <div className="flex items-center py-4">
                                                <div className={`flex h-[70px] w-[70px] bg-${team.TeamColor}-600/10 rounded-full items-center justify-center mr-4 p-3`}>
                                                    <Link href={`/football/${team.TeamSlug}/${team.Year}`}>
                                                        <Image
                                                            src={`${team.TeamLogo}`}
                                                            height={60}
                                                            width={60}
                                                            alt={`${team.Team}`}
                                                        />
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link href={`/football/${team.TeamSlug}/${team.Year}`}>
                                                        <strong>{team.Team}</strong>
                                                    </Link>
                                                    <span className="font-normal text-gray-500"> ({team.TeamCity}, {team.TeamState})</span>
                                                    <div className="font-normal text-gray-500">Spartans</div>
                                                </div>
                                            </div>
                                            <div className="sm:py-4 ml-[60px] sm:ml-0">
                                                <div className="text-sm font-normal text-gray-500">Overall Record</div>
                                                <div className="text-lg font-semibold">{team.Wins} - {team.Losses}</div>
                                            </div>
                                        </div>

                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>

    )
}
