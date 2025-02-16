import React from "react"
import MessageSection from "./components/message-section"
import SecondaryLayout from "@/components/layout/secondary"
import ChatInputSection from "./components/input-section"

async function ChatPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params

    return (
        <SecondaryLayout title="聊天室">
            {/* 聊天訊息區域 */}
            <MessageSection conversationId={id} />
            {/* 輸入框區域 */}
            <ChatInputSection />
        </SecondaryLayout>
    )
}

export default ChatPage
