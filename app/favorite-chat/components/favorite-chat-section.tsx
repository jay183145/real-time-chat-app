"use client"

import React, { useState } from "react"
import { useAuthStore } from "@/lib/auth/auth-store"
import FavoriteChatList from "@/components/home/components/favorite"
import AuthAlert from "@/components/auth/alert"

function FavoriteChatSection() {
    const { userInfo } = useAuthStore()
    const [isShowAuthAlert, setIsShowAuthAlert] = useState(!userInfo)

    return (
        <>
            {userInfo && (
                <div className="mx-auto my-4 w-[370px] rounded-xl bg-primary-1 p-4">
                    <FavoriteChatList />
                </div>
            )}
            {isShowAuthAlert && <AuthAlert isShow={isShowAuthAlert} setIsShow={setIsShowAuthAlert} />}
        </>
    )
}

export default FavoriteChatSection
