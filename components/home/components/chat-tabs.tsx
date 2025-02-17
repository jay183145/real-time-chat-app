"use client"

import cn from "@/utils/cn"
import React from "react"

type ChatTabsProps = {
    chatTabs: { icon: string; label: string; color: string }[]
    activeTab: string
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
}
function ChatTabs({ chatTabs, activeTab, setActiveTab }: ChatTabsProps) {
    const handleTabClick = (tab: string) => {
        setActiveTab(tab)
    }
    return (
        <div className="mb-4 flex justify-between">
            {chatTabs.map((item) => (
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

export default ChatTabs
