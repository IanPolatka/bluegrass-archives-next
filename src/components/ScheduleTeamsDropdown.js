"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'

export default function ScheduleTeamsDropdown() {
    const router = useRouter()
    const {slug, year} = useParams()
    const [teams, setTeams] = useState([])

    useEffect(() => {
        getTeams()
    }, [])

    const getTeams = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teams/kentucky`)
            .then(({data}) => {
                setTeams(data.data)
            })
            .catch(() => {
            })
    }

    function handleSelect(e) {
        e.preventDefault()
        router.push('/football/' + e.target.value + '/' + year)
    }

    return (
        <div>
            <label htmlFor="teams" className="hidden block mb-2 text-xs font-medium font-semibold uppercase text-sky-600 dark:text-white">Select A Team</label>
            <select className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-sky-600" onChange={handleSelect} value={slug}>
                <option>Select A Team</option>
                {teams.map((team) => {
                    return (
                        <option key={team.id} value={team.slug}>{team.name}</option>
                    )
                })}
            </select>
        </div>
    )
}
