import React from "react"
import RootLayout from "@/components/layout"
import FavoriteChatSection from "./components/favorite-chat-section"
function FavoriteChatPage() {
    return (
        <RootLayout title="收藏聊天室">
            <FavoriteChatSection />
        </RootLayout>
    )
}

export default FavoriteChatPage
