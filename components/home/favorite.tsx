"use client"

import cn from "@/utils/cn"
import React, { useState } from "react"

function Favorite() {
    const [activeTab, setActiveTab] = useState("收藏")
    const handleTabClick = (tab: string) => {
        setActiveTab(tab)
    }
    return (
        <div className="mb-4 flex justify-between">
            {[
                { icon: "⭐", label: "收藏", color: "text-yellow-500" },
                { icon: "🔥", label: "熱門", color: "text-red-500" },
                { icon: "💝", label: "交友", color: "text-pink-500" },
                { icon: "📻", label: "廣播", color: "text-blue-500" },
            ].map((item) => (
                <button
                    key={item.label}
                    className={cn(
                        "flex items-center gap-1 px-3 py-1",
                        activeTab === item.label && "rounded-3xl bg-neutral-800 shadow-lg",
                    )}
                    onClick={() => handleTabClick(item.label)}
                >
                    <span className="text-xl">{item.icon}</span>
                    <span className={`text-sm ${item.color}`}>{item.label}</span>
                </button>
            ))}
        </div>
    )
}

export default Favorite
