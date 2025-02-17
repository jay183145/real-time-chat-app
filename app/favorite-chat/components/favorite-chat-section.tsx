"use client"

import React, { useState } from "react"
import { useAuthStore } from "@/lib/auth/auth-store"
import FavoriteChatList from "@/components/home/components/favorite"
import AuthAlert from "@/components/auth/alert"

function FavoriteChatSection() {
    const { userInfo } = useAuthStore()
    const [isShowAuthAlert, setIsShowAuthAlert] = useState(!userInfo)

    return (
        <div className="mx-auto mt-4 w-[400px] rounded-xl bg-primary-1 p-4">
            <FavoriteChatList />
            <AuthAlert isShow={isShowAuthAlert} setIsShow={setIsShowAuthAlert} />
        </div>
    )
}

export default FavoriteChatSection
