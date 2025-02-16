"use client"

import React, { useState } from "react"
import { useMessages } from "@/app/chat/[id]/context/messages-context"
import { useAuthStore } from "@/lib/auth/auth-store"
import { useParams } from "next/navigation"
import { MessageType } from "@/lib/api/messages/type"
import { nanoid } from "nanoid"

function ChatInputSection() {
    const [inputValue, setInputValue] = useState("")
    const { messages, setMessages } = useMessages()
    const { userInfo } = useAuthStore()
    const params = useParams<{ id: string }>()
    const conversationId = params.id

    const tempId = nanoid()

    const handleSend = () => {
        if (inputValue.trim() === "") return
        if (!userInfo) return

        const newMessage = {
            // 樂觀更新：先將訊息加到畫面上，等伺服器回應後再用真正的 _id 更新
            _id: tempId,
            conversationId: parseInt(conversationId),
            userId: userInfo?.userId,
            user: userInfo?.user,
            avatar: userInfo?.avatar,
            messageType: "text" as MessageType,
            message: inputValue,
            reactions: { like: 0, love: 0, laugh: 0 },
            timestamp: new Date().getTime(),
        }

        setMessages([newMessage, ...messages])
        setInputValue("")
    }

    return (
        <div className="border-t border-neutral-500 bg-neutral-700 px-4 py-3">
            <div className="flex">
                <input
                    type="text"
                    className="flex-1 rounded-l border px-4 py-2 focus:outline-none focus:ring-primary-3"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="輸入訊息..."
                />
                <button
                    className="rounded-r bg-primary-4 px-4 py-2 text-shades-100 hover:bg-primary-3"
                    onClick={handleSend}
                >
                    傳送
                </button>
            </div>
        </div>
    )
}

export default ChatInputSection
