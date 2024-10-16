import { useState } from "react"
import axios from '@/lib/axios'
import Image from 'next/image'

export default function UserHeroFavorite({team, favoriteIds, getFavorites, getFavoritesById, getGames}) {
    const [loading, setLoading] = useState(false)
    
    function addToFavorites(id) {
        setLoading(true)
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/favorites/football/${id}`)
            .then(() => {
                getFavorites()
                getFavoritesById()
                getGames()
                setLoading(false)
            })
            .catch(() => {
                getFavorites()
                getFavoritesById()
                getGames()
                setLoading(false)
            })
    }

    function removeFromFavorites(id) {
        setLoading(true)
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/favorites/football/${id}`)
            .then(() => {
                getFavorites()
                getFavoritesById()
                getGames()
                setLoading(false)
            })
            .catch(() => {
                getFavorites()
                getFavoritesById()
                getGames()
                setLoading(false)
            })
    }

    return (
        <div className={`flex justify-between w-full p-3 text-sm bg-white border shadow-sm rounded ${favoriteIds.includes(team.id) ? " border-green-600 shadow-green-200" : "border-gray-300"}`}>
            <div className="flex items-center space-x-2">
                <Image
                    src={`${team.logo}`}
                    height={32}
                    width={32}
                    alt={`${team.logo}`}
                    title={`${team.logo}`}
                />
                <div>
                    <div className="font-semibold">{team.name}</div>
                    <div className="mt-1 text-xs text-gray-500 sm:hidden">{team.city}, {team.state}</div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <div className="hidden text-xs text-gray-500 sm:block">{team.city}, {team.state}</div>
                <div className="pl-2 sm:border-l">
                    {loading ? 
                        <div className="flex items-center justify-center w-8 h-8 text-xs font-semibold text-center text-white bg-black border border-black rounded sm:w-24">        
                            <svg id="loader-1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 50 50">
                                <path fill="#ffffff" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"></path>
                            </svg>
                        </div>
                        : favoriteIds.includes(team.id) ?
                            <button onClick={() => {removeFromFavorites(team.id)}} className="w-8 h-8 text-xs font-semibold text-center text-white bg-green-600 border border-green-600 rounded sm:w-24">
                                <span className="block sm:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mx-auto">
                                        <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                <span className="hidden sm:block">Following</span>
                            </button>
                            : <button onClick={() => {addToFavorites(team.id)}} className="w-8 h-8 text-xs font-semibold text-center text-white bg-black border border-black rounded sm:w-24">
                                <span className="block sm:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mx-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                    </svg>
                                </span>
                                <span className="hidden sm:block">Follow</span>
                              </button>
                    }
                </div>
            </div>
        </div>
    )
}