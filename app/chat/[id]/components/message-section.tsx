"use client"

import React, { useEffect, useState } from "react"
import { getMessages } from "@/lib/api/messages"
import Image from "next/image"
import { Message } from "@/lib/api/messages/type"
import { useAuthStore } from "@/lib/auth/auth-store"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import { Heart, Smile, ThumbsUp } from "lucide-react"

type MessageSectionProps = {
    conversationId: number
}

type MessageHasReactionBefore = {
    messageId: string
    reactions: ("like" | "love" | "laugh")[]
}

function MessageSection({ conversationId }: MessageSectionProps) {
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([])
    const [messagesHasReactionBefore, setMessagesHasReactionBefore] = useState<MessageHasReactionBefore[]>([])

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
                // 找到按反應的訊息
                if (msg._id === messageId) {
                    // 判斷是否已按過反應
                    const idHasReactionBefore = messagesHasReactionBefore.find((item) => item.messageId === messageId)
                    if (idHasReactionBefore) {
                        // 判斷是否已按過同 ID 其他反應
                        const reactionHasReactionBefore = idHasReactionBefore?.reactions.includes(
                            reaction as keyof typeof msg.reactions,
                        )
                        if (reactionHasReactionBefore) {
                            // 使用者已經按過反應，則取消反應
                            const newReactionObj: MessageHasReactionBefore = {
                                messageId,
                                reactions: idHasReactionBefore.reactions.filter((item) => item !== reaction),
                            }
                            setMessagesHasReactionBefore((prev) =>
                                prev.map((item) => (item.messageId === messageId ? newReactionObj : item)),
                            )
                            // 更新反應數量
                            const updatedReactions = { ...msg.reactions }

                            updatedReactions[reaction as keyof typeof msg.reactions] =
                                (updatedReactions[reaction as keyof typeof msg.reactions] || 0) - 1

                            return { ...msg, reactions: updatedReactions }
                        }
                    }

                    // 使用者未按過反應，則增加反應
                    const newReactionObj: MessageHasReactionBefore = {
                        messageId,
                        reactions: [...(idHasReactionBefore?.reactions || []), reaction as keyof typeof msg.reactions],
                    }
                    setMessagesHasReactionBefore((prev) => {
                        const existingIndex = prev.findIndex((item) => item.messageId === messageId)
                        if (existingIndex !== -1) {
                            // 使用者有按過同 ID 其他反應，則將原本的 object 以 newReactionObj 更新
                            return prev.map((item) => (item.messageId === messageId ? newReactionObj : item))
                        }
                        // 使用者未按過同 ID 其他反應，則增加 newReactionObj
                        return [...prev, newReactionObj]
                    })
                    // 更新反應數量
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
                                    className={`mt-1 flex gap-2 text-sm ${isCurrentUser ? "justify-end" : "justify-start"}`}
                                >
                                    {Object.entries(msg.reactions).map(([key, value]) => {
                                        // 檢查使用者是否對這個訊息按過這個反應
                                        const hasReacted = messagesHasReactionBefore
                                            .find((item) => item.messageId === msg._id)
                                            ?.reactions.includes(key as "like" | "love" | "laugh")

                                        return (
                                            <span
                                                onClick={() => handleReactionClick(msg._id, key)}
                                                className={`flex cursor-pointer items-center gap-1 hover:motion-preset-pulse-sm ${
                                                    hasReacted ? "text-neutral-200" : "text-neutral-500"
                                                }`}
                                                key={key}
                                            >
                                                {key === "like" && (
                                                    <ThumbsUp
                                                        className={`h-4 w-4 ${hasReacted ? "text-primary-4" : ""}`}
                                                    />
                                                )}
                                                {key === "love" && (
                                                    <Heart className={`h-4 w-4 ${hasReacted ? "text-red-500" : ""}`} />
                                                )}
                                                {key === "laugh" && (
                                                    <Smile
                                                        className={`h-4 w-4 ${hasReacted ? "text-yellow-500" : ""}`}
                                                    />
                                                )}
                                                <span>{key}</span>
                                                <span>{value}</span>
                                            </span>
                                        )
                                    })}
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
