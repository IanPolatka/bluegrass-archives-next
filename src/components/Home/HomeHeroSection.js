"use client"

import { useAuth } from "@/hooks/auth"
import UserHeroSection from "@/components/Home/UserHeroSection"
import UserFavoritesToday from "./UserFavoritesToday"
import UserFavoritesPast from "./UserFavoritesPast"
import UserFavoritesFuture from "./UserFavoritesFuture"
import GuestToday from "./GuestToday"
import GuestPast from "./GuestPast"
import GuestFuture from "./GuestFuture"
import GuestHeroSection from "./GuestHeroSection"

export default function HeroSection() {
    const { user } = useAuth()

    return (
        <div>
            {user ?
                <div>
                    <UserHeroSection user={user} />
                    <UserFavoritesToday />
                    <UserFavoritesPast />
                    <UserFavoritesFuture /> 
                </div>
            :
                <div>
                    <GuestHeroSection />
                    <GuestToday />
                    <GuestPast />
                    <GuestFuture />
                </div>
            }
        </div>
    )
}
