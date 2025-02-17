"use client"

import React, { useState } from "react"
import ChatTabs from "./components/chat-tabs"
import HotChatList from "./components/hot"
import FavoriteChatList from "./components/favorite"
import DatingChatList from "./components/dating"
// import HottestToday from "@/components/home/hottest-today"

const chatTabs = [
    { icon: "⭐", label: "收藏", color: "text-yellow-500" },
    { icon: "🔥", label: "熱門", color: "text-red-500" },
    { icon: "💝", label: "交友", color: "text-pink-500" },
    { icon: "📻", label: "廣播", color: "text-blue-500" },
]

function ChatListSection() {
    const [activeTab, setActiveTab] = useState("熱門")
    return (
        <div className="mx-4 mt-4 rounded-xl bg-primary-1 p-4">
            {/* 今日人氣排行 */}
            {/* <HottestToday /> */}
            {/* 收藏列表 */}
            <ChatTabs chatTabs={chatTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {/* 聊天室列表 */}
            {activeTab === "收藏" && <FavoriteChatList />}
            {activeTab === "熱門" && <HotChatList />}
            {activeTab === "交友" && <DatingChatList />}
        </div>
    )
}

export default ChatListSection
