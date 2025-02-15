"use client"

import React, { useEffect, useState } from "react"
import { getMessages } from "@/lib/api/messages"
import Image from "next/image"
import { Message } from "@/lib/api/messages/type"
import { useAuthStore } from "@/lib/auth/auth-store"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"

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
                setMessages(data || [])
            }
        }

        fetchMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleReactionClick(messageId: string, reaction: string) {
        setMessages((prevMessages) =>
            prevMessages.map((msg) => {
                if (msg._id === messageId) {
                    const updatedReactions = { ...msg.reactions }

                    updatedReactions[reaction as keyof typeof msg.reactions] =
                        (updatedReactions[reaction as keyof typeof msg.reactions] || 0) + 1

                    return { ...msg, reactions: updatedReactions }
                }
                return msg
            }),
        )
    }

    return (
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
            {messages?.map((msg, index) => {
                // 判斷是否為系統訊息
                if (msg.messageType === "system") {
                    return (
                        <div key={index} className="mb-4 flex justify-center">
                            <div className="rounded-md bg-neutral-700 px-4 py-2 text-sm text-neutral-400">
                                {msg.message}
                            </div>
                        </div>
                    )
                }

                const isCurrentUser = msg.userId === currentUserId

                return (
                    <div
                        key={index}
                        className={`mb-4 flex items-start ${isCurrentUser ? "justify-end" : "justify-start"}`}
                    >
                        {/* 他人訊息才顯示頭像，自己的訊息隱藏 */}
                        {!isCurrentUser && (
                            <div className="mr-2 flex-shrink-0">
                                <Image
                                    src={msg.avatar}
                                    alt={msg.user}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            </div>
                        )}

                        <div className={` ${isCurrentUser ? "text-right" : "text-left"}`}>
                            {/* 如果是他人訊息，顯示名稱 */}
                            {!isCurrentUser && <div className="rouu text-sm text-neutral-500">{msg.user}</div>}
                            <div className="flex gap-2">
                                {/* 如果是文字訊息 */}
                                {msg.messageType === "text" && (
                                    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                                        <p
                                            className={`flex break-words rounded-xl px-3 py-2 ${isCurrentUser ? "bg-primary-4 text-shades-100" : "bg-shades-100 text-shades-0"}`}
                                        >
                                            {msg.message}
                                        </p>
                                    </div>
                                )}

                                {/* 如果是圖片訊息 */}
                                {msg.messageType === "image" && (
                                    <Image
                                        src={msg.message}
                                        alt="Image Message"
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
                            {Object.keys(msg.reactions).length > 0 && (
                                <div
                                    className={`mt-1 flex gap-2 text-sm text-neutral-300 ${isCurrentUser ? "justify-end" : "justify-start"}`}
                                >
                                    {Object.entries(msg.reactions).map(([key, value]) => (
                                        <span
                                            onClick={() => handleReactionClick(msg._id, key)}
                                            className="hover:motion-preset-pulse-sm flex cursor-pointer items-center gap-1 hover:text-neutral-500"
                                            key={key}
                                        >
                                            {key === "like" && <span>👍</span>}
                                            {key === "love" && <span>❤️</span>}
                                            {key === "laugh" && <span>😂</span>}
                                            <span>{key}</span>
                                            <span>{value}</span>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MessageSection
