"use client"

import React from "react"
import { Home, Activity, MessageCircle, CircleUserRound } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

function BottomNav() {
    const pathname = usePathname()

    return (
        <div className="mt-auto border-t bg-neutral-900 text-neutral-800">
            <div className="flex justify-around py-2">
                {[
                    { icon: Home, label: "首頁", href: "/" },
                    { icon: Activity, label: "動態", href: "/activity" },
                    // 目前暫時 用 1 - 10 隨機去聊天室之後用個人聊天室列表取代
                    { icon: MessageCircle, label: "聊天", href: `/chat/${Math.floor(Math.random() * 10) + 1}` },
                    { icon: CircleUserRound, label: "個人", href: "/profile" },
                ].map((item) => (
                    <Link href={item.href} key={item.label} className="flex flex-col items-center gap-1 px-4">
                        <item.icon
                            className={`h-6 w-6 ${pathname === item.href ? "text-primary-4" : "text-neutral-400"}`}
                        />
                        <span className={`text-xs ${pathname === item.href ? "text-primary-4" : "text-neutral-400"}`}>
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BottomNav
