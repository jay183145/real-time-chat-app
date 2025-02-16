import React from "react"
import MessageSection from "./components/message-section"
import SecondaryLayout from "@/components/layout/secondary"
import ChatInputSection from "./components/input-section"
import { MessagesProvider } from "./context/messages-context"

async function ChatPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params

    return (
        <SecondaryLayout title="聊天室">
            <MessagesProvider>
                {/* 聊天訊息區域 */}
                <MessageSection conversationId={id} />
                {/* 輸入框區域 */}
                <ChatInputSection />
            </MessagesProvider>
        </SecondaryLayout>
    )
}

export default ChatPage
