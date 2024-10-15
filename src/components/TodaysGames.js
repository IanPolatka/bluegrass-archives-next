'use client'

import axios from "@/lib/axios"
import useSWR from "swr"

function TodaysGames() {
    const { data: games } = useSWR('football/past', () =>
        axios
            .get('football/past')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )

    return (
        <div>
            {games?.data.map((game, index) => (
                <div key={index}>{game.id}</div>
            ))}
        </div>
    )
}

export default TodaysGames
