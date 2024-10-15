"use client"

import { useEffect, useState } from 'react'
import { Toggle } from "@/components/ui/toggle"
import { FontBoldIcon } from "@radix-ui/react-icons"
import { useParams } from 'next/navigation'
import React from 'react'
import axios from '@/lib/axios'
import { toast } from "sonner"

function FavoriteToggle() {
    const {slug} = useParams()
    const [favorite, setFavorite] = useState(false)
    const [loading, setLoading] = useState(false)

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    useEffect(() => {
        checkFavorites();
    }, [])

    function checkFavorites() {
        setLoading(true)
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/favorites/football/` + slug)
            .then(({data}) => {
                setFavorite(data.data)
                setLoading(false)
            })
            .catch(() => {
                setFavorite("")
                setLoading(false)
            })
    }

    function addToFavorites(event, id) {
        event.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/favorites/football/${id}`)
            .then(({data}) => {
                checkFavorites()
                toast.success(`${toTitleCase(slug.replaceAll("-", " "))} has been added as one of your favorites`)
            })
            .catch(() => {
                checkFavorites();
            })
    }

    function removeFromFavorites(event, id) {
        event.preventDefault()
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/favorites/football/${id}`)
            .then(({data}) => {
                checkFavorites()
                toast.info(`${toTitleCase(slug.replaceAll("-", " "))} has been removed as one of your favorites`, {
                    action: {
                      label: 'Undo',
                      onClick: () => addToFavorites(event, id)
                    }
                })
            })
            .catch(() => {
                checkFavorites()
            })
    }

    if (loading) return <div className="flex items-center justify-center w-24 h-8 text-xs font-semibold text-black uppercase border border-gray-300 rounded xl:ml-4">Loading</div>

    return (
        <>
            {favorite.length > 0 &&
                favorite[0].Favorite == 'yes' ?
                    <Toggle onClick={(e) => {removeFromFavorites(e, favorite[0].Team.id);}} aria-label="Unfavorite Team" className="flex items-center justify-center w-24 h-8 text-xs font-semibold uppercase border border-transparent rounded xl:ml-4 text-emerald-600 bg-emerald-600/10">Following</Toggle>
                :
                    <Toggle onClick={(e) => {addToFavorites(e, favorite[0].Team.id);}} aria-label="Favorite Team" className="flex items-center justify-center w-24 h-8 text-xs font-semibold text-black uppercase border border-gray-300 rounded xl:ml-4">Follow</Toggle>
                }
        </>
    )
}

export default FavoriteToggle
