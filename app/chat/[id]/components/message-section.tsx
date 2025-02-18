"use client"

import React, { useEffect, useState } from "react"
import { getMessages } from "@/lib/api/messages"
import Image from "next/image"
import { Message } from "@/lib/api/messages/type"
import { useAuthStore } from "@/lib/auth/auth-store"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import MessageReactions from "./message-reactions"
import LazyMessageImage from "@/components/lazy-message-image"

type MessageSectionProps = {
    conversationId: number
}

function MessageSection({ conversationId }: MessageSectionProps) {
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([])

    const { logout, userInfo } = useAuthStore()
    const currentUserId = userInfo?.userId

    useEffect(() => {
        const fetchMessages = async () => {
            const { data, error } = await getMessages({ conversationId })
            if (error) {
                if (error.code === 401) {
                    logout()
                    router.push("/?auth=login")
                }
            } else {
                // 根據 timestamp 排序訊息，從新到舊
                const sortedMessages = [...(data || [])].sort(
                    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
                )
                setMessages(sortedMessages)
            }
        }

        fetchMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-1 flex-col-reverse overflow-y-auto bg-neutral-800 p-4">
            {messages?.map((msg: Message) => {
                // 判斷是否為系統訊息
                if (msg.messageType === "system") {
                    return (
                        <div key={msg._id} className="mb-4 flex justify-center">
                            <div className="rounded-md bg-neutral-700 px-4 py-2 text-sm text-neutral-400">
                                {msg.message}
                            </div>
                        </div>
                    )
                }

                const isCurrentUser = msg.userId === currentUserId

                return (
                    <div
                        key={msg._id}
                        className={`mb-4 flex items-start ${isCurrentUser ? "justify-end" : "justify-start"}`}
                    >
                        {/* 他人訊息才顯示頭像，自己的訊息隱藏 */}
                        {!isCurrentUser && (
                            <div className="mr-2 flex-shrink-0">
                                <Image
                                    loading="lazy"
                                    src={msg.avatar}
                                    alt={msg.user}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            </div>
                        )}

                        <div className={`${isCurrentUser ? "text-right" : "text-left"}`}>
                            {/* 如果是他人訊息，顯示名稱 */}
                            {!isCurrentUser && <div className="text-sm text-neutral-500">{msg.user}</div>}
                            <div className="flex gap-2">
                                {/* 如果是文字訊息 */}
                                {msg.messageType === "text" && (
                                    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                                        <p
                                            className={`flex break-words rounded-xl px-3 py-2 ${
                                                isCurrentUser
                                                    ? "bg-primary-4 text-shades-100"
                                                    : "bg-shades-100 text-shades-0"
                                            }`}
                                        >
                                            {msg.message}
                                        </p>
                                    </div>
                                )}

                                {/* 如果是圖片訊息，使用 LazyMessageImage */}
                                {msg.messageType === "image" && (
                                    <LazyMessageImage
                                        src={msg.message}
                                        alt={msg.message}
                                        width={200}
                                        height={200}
                                        className="rounded shadow"
                                    />
                                )}

                                {/* 時間顯示 */}
                                <div className={`flex w-full flex-1 ${isCurrentUser ? "order-first" : "order-last"}`}>
                                    <div className="flex w-full items-end justify-end text-xs text-neutral-500">
                                        {dayjs(msg.timestamp).format("HH:mm")}
                                    </div>
                                </div>
                            </div>

                            {/* 反應 */}
                            <MessageReactions
                                reactions={msg.reactions}
                                messageId={msg._id}
                                isCurrentUser={isCurrentUser}
                                setMessages={setMessages}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MessageSection
