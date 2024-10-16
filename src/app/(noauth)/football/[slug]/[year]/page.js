import React from 'react'
import TeamClassStandings from '@/components/TeamClassStandings'
import TeamDetails from '@/components/TeamDetails'
import { notFound } from "next/navigation"
import TeamSchedule from '@/components/Schedules/TeamSchedule'
import BackToHomeButton from '@/components/BackToHomeButton'

async function getTeam(slug, year) {    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teams/` + slug + `/` + year, {
        next: {
            revalidate: 60
        }
    })

    if (!res.ok) {
        notFound()
    }

    return res.json()
}

function teamNameStringReplacement(value) {
    const teamName = value.split('-').join(' ')
    const words = teamName.split(" ")

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1)
    }

    return words.join(" ")
}

export async function generateMetadata({ params }) {
    const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
    const title = capitalize(params.slug.replaceAll('-',' '))
    return {
      title: 'Bluegrass Archives - ' + title + ' ' + params.year + ' Schedule',
    }
}

export default async function Schedule({ params }) {
    const team = await getTeam(params.slug, params.year)
    const slug = params.slug
    const year = params.year

    return (
        <main>
            <div className="p-4 mx-auto mt-4 md:p-0 md:mt-16 max-w-7xl">
                <div className="space-y-4 md:mx-12">
                    <BackToHomeButton />
                    <TeamDetails team={team} slug={slug} />
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="col-span-8 mb-8">
                            <div className="bg-white border border-gray-300 rounded-md">
                                <h1 className="p-4 text-lg font-semibold border-b border-gray-300 md:py-6 dark:text-white">{teamNameStringReplacement(slug)} {year} Schedule</h1>
                                <div className="">
                                    <TeamSchedule slug={slug} year={year} />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 mb-8">
                            <TeamClassStandings slug={slug} year={year} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
