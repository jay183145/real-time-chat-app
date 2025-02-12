import React from "react"
import { Home, Activity, MessageCircle, User } from "lucide-react"
import Link from "next/link"

function BottomNav() {
    return (
        <div className="bg-primary-4 mt-auto border-t text-neutral-800">
            <div className="flex justify-around py-2">
                {[
                    { icon: Home, label: "首頁", href: "/" },
                    { icon: Activity, label: "動態", href: "/activity" },
                    { icon: MessageCircle, label: "聊天", href: "/chat" },
                    { icon: User, label: "個人", href: "/profile" },
                ].map((item) => (
                    <Link href={item.href} key={item.label} className="flex flex-col items-center gap-1 px-4">
                        <item.icon className="h-6 w-6" />
                        <span className="text-xs">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BottomNav
