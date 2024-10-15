"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'

export default function StandingsClassesDropdown() {
    const router = useRouter()
    const {className, year} = useParams()
    const [classList, setClassList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getClassList()
    }, [])

    const getClassList = () => {
        setLoading(true)
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/football/classes`)
            .then(({data}) => {
                setClassList(data.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    function handleSelect(e) {
        e.preventDefault()
        router.push('/football/standings/' + e.target.value + '/' + year)
    }

    return (
        <div>
            <label htmlFor="teams" className="hidden block mb-2 text-xs font-medium font-semibold uppercase text-sky-600 dark:text-white">Select A Team</label>
            <select className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-sky-600" onChange={handleSelect} value={className}>
                <option>Select A Team</option>
                {classList.map((c) => {
                    return (
                        <option key={c.id} value={c.class_name}>{c.class_name}</option>
                    )
                })}
            </select>
        </div>
    )
}
