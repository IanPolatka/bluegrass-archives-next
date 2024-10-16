"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'

export default function ScheduleYearsDropdown() {
    const router = useRouter()
    const {slug, year} = useParams()
    const [years, setYears] = useState([])

    useEffect(() => {
        getYears()
    }, [])

    const getYears = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/years`)
            .then(({data}) => {
                setYears(data.data)
            })
            .catch(() => {
            })
    }

    function handleSelect(e) {
        e.preventDefault()
        router.push('/football/' + slug + '/' + e.target.value)
    }

    return (
        <div>
            <label htmlFor="years" className="hidden block mb-2 text-xs font-semibold uppercase text-sky-600 dark:text-white">Select A Year</label>
            <select className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-sky-600" onChange={handleSelect} value={year}>
                <option>Select A Year</option>
                {years.map((year) => {
                    return (
                        <option key={year.id} value={year.year}>{year.year}</option>
                    )
                })}
            </select>
        </div>
    )
}
