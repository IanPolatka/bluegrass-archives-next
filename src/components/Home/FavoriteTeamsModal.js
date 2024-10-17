"use client"

import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UserHeroFavorite from './UserHeroFavorite'

function FavoriteTeamsModal({getGames}) {
    const [teams, setTeams] = useState([])
    const [favoriteIds, setFavoriteIds] = useState([])
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        getTeams()
        getFavoritesById()
        getFavorites()
    }, [])

    const getTeams = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teams/kentucky`)
            .then(({data}) => {
                setTeams(data.data)
                setLoading(false)
            })
            .catch(() => {
            })
    }

    const getFavoritesById = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/favorites/ids`)
            .then(({data}) => {
                setFavoriteIds(data.data)
            })
            .catch(() => {

            })
    }

    const getFavorites = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/favorites/football`)
            .then(({data}) => {
                setFavorites(data.data)
            })
            .catch(() => {

            })
    }

    return (

            <Dialog>
                <DialogTrigger>
                    <button className="flex items-center px-3 py-1.5 text-sm font-semibold text-white transition duration-150 ease-in bg-green-600 border border-green-600 rounded hover:bg-green-700 hover:border-green-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="mr-1 size-4">
                            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                        </svg>
                        Add A Favorite
                    </button>
                </DialogTrigger>
                <DialogContent className="border-none">
                    <div className="absolute w-full h-1/4 -z-20 bg-gradient-to-r from-amber-500/0 from-30% via-amber-500/40 via-100%"></div>
                    <div className="absolute w-full h-1/4 -z-10 bg-gradient-to-t from-white"></div>
                    <DialogHeader>
                        <DialogTitle>Select Your Favorite Teams</DialogTitle>
                        <DialogDescription>
                            <p className="mb-3">By selecting your favorite teams you will see their scores first on the home page.</p>
                            <hr className="mb-4 border-gray-300" />
                            <div className="space-y-3">
                            <div className="space-y-3 h-3/4">
                                {teams.length > 0 ?
                                    teams.map((team, index) => {
                                        return (
                                            <UserHeroFavorite key={index} team={team} favorites={favorites} favoriteIds={favoriteIds} getFavorites={getFavorites} getFavoritesById={getFavoritesById} getGames={getGames} />
                                        )
                                    })
                                :
                                    <div className="flex justify-between w-full p-3 text-sm font-semibold text-red-600 transition ease-in bg-red-100 border border-red-300 rounded shadow-sm">No Teams Found</div>
                                }
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

    )
}

export default FavoriteTeamsModal
