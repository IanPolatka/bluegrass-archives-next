"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'

export default function TournamentsDropdown() {
    const router = useRouter()
    const {id} = useParams()
    const [tournaments, setTournaments] = useState([])

    useEffect(() => {
        getTournaments()
    }, [id])

    const getTournaments = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tournaments`)
            .then(({data}) => {
                setTournaments(data.data)
            })
            .catch(() => {
            })
    }

    function handleSelect(e) {
        e.preventDefault()
        router.push('/football/tournaments/' + e.target.value)
    }

    return (
        <div>
            <label htmlFor="years" className="hidden block mb-2 text-xs font-semibold uppercase text-sky-600 dark:text-white">Select A Year</label>
            <select className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-sky-600" onChange={handleSelect} value={id}>
                <option>Select A Tournaments</option>
                {tournaments.map((t) => {
                    return (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    )
                })}
            </select>
        </div>
    )
}
