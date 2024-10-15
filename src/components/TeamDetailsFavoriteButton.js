// "use client"

// import { useEffect, useState } from 'react'
// import axios from '@/lib/axios'
// import { useParams } from 'next/navigation'
// import { toast } from "sonner"
// import { useAuth } from '@/hooks/auth'


// export default function TeamDetailsFavoriteButton() {
//     const {slug} = useParams()
//     const [favorite, setFavorite] = useState({})
//     const [loading, setLoading] = useState(true)
//     const { user } = useAuth()


//     function toTitleCase(str) {
//         return str.replace(/\w\S*/g, function(txt){
//             return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//         });
//     }

//     useEffect(() => {
//         checkFavorites();
//     }, [])

//     function checkFavorites() {
//         axios.get('http://localhost:8000/api/favorites/football/' + slug)
//             .then(({data}) => {
//                 setFavorite(data.data)
//             })
//             .catch(() => {
//                 setFavorite("")
//             })
//     }

//     function addToFavorites(event, id) {
//         event.preventDefault()
//         axios.post(`http://localhost:8000/api/favorites/football/${id}`)
//             .then(({data}) => {
//                 setLoading(false)
//                 checkFavorites()
//                 toast.success(`${toTitleCase(slug.replaceAll("-", " "))} has been added as one of your favorites`, {
//                     duration: 3000,
//                 })
//             })
//             .catch(() => {
//                 setLoading(false)
//                 checkFavorites();
//             })
//     }

//     function removeFromFavorites(event, id) {
//         event.preventDefault()
//         axios.delete(`http://localhost:8000/api/favorites/football/${id}`)
//             .then(({data}) => {
//                 setLoading(false)
//                 checkFavorites()
//                 toast.success(`${toTitleCase(slug.replaceAll("-", " "))} has been removed as one of your favorites`, {
//                     action: {
//                       label: 'Undo',
//                       onClick: () => addToFavorites(event, id)
//                     },
//                     duration: 3000,
//                 })
//             })
//             .catch(() => {
//                 setLoading(false)
//                 checkFavorites()
//             })
//     }

//     return (
//         <div>
//             {user &&
//                 favorite.length > 0 &&
//                     favorite[0].Favorite == 'yes' ?
//                         <button onClick={(e) => {removeFromFavorites(e, favorite[0].Team.id);}} className="flex items-center justify-center w-24 h-8 text-xs font-semibold uppercase border border-transparent rounded xl:ml-4 text-emerald-600 bg-emerald-600/10">Following</button>
//                         : <button onClick={(e) => {addToFavorites(e, favorite[0].Team.id);}} className="flex items-center justify-center w-24 h-8 text-xs font-semibold text-black uppercase border border-gray-300 rounded xl:ml-4">Follow</button>
//             }            
//         </div>
//     )
// }
