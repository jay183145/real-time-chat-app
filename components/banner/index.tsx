"use client"

import React from "react"
import { useRouter } from "next/navigation"

function Banner() {
    const router = useRouter()

    return (
        <div
            onClick={() => router.push("/?auth=register")}
            className="relative mx-auto my-4 w-[370px] cursor-pointer rounded-xl bg-primary-2 p-4"
        >
            <div className="mb-2 flex flex-col items-center gap-2 text-xl font-bold">
                <span className="relative">
                    找尋新的交友圈
                    <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-400" />
                </span>
                <span className="text-center text-primary-5">立即註冊送 1000 積分</span>
                <div className="text-sm opacity-80">時間: 2月10日 - 2月18日</div>
            </div>
        </div>
    )
}

export default Banner
