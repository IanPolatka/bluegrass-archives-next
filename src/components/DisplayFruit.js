'use client'

import axios from "@/lib/axios"
import useSWR from "swr"

export const DisplayFruit = () => {
    const { data: fruits } = useSWR('/api/fruits', () =>
        axios
            .get('/api/fruits')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )

    return (
        <div>
            <h2>Your Fruits</h2>
            <div className="flex items-center">
                {fruits?.map((fruit, index) => {
                    return (
                        <div key={index} className="w-full">{fruit.name}</div>
                    )
                }) }
            </div>
        </div>
    )
}