"use client"

import { Heart, Smile, ThumbsUp } from "lucide-react"
import { useState } from "react"
import { Message } from "@/lib/api/messages/type"

type MessageHasReactionBefore = {
    messageId: string
    reactions: ("like" | "love" | "laugh")[]
}

type MessageReactionsProps = {
    reactions: Record<string, number>
    messageId: string
    isCurrentUser: boolean
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

function MessageReactions({ reactions, messageId, isCurrentUser, setMessages }: MessageReactionsProps) {
    const [animatingMessageId, setAnimatingMessageId] = useState<{ messageId: string; reaction: string } | null>(null)
    const [messagesHasReactionBefore, setMessagesHasReactionBefore] = useState<MessageHasReactionBefore[]>([])

    function handleReactionClick(messageId: string, reaction: string) {
        setMessages((prevMessages: Message[]) =>
            prevMessages.map((msg: Message) => {
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
        <div
            className={`mt-1 flex gap-2 text-sm motion-translate-y-in-100 motion-blur-in-md motion-opacity-in-0 ${isCurrentUser ? "justify-end" : "justify-start"}`}
        >
            {Object.entries(reactions).map(([reactionType, count]) => {
                const userReaction = messagesHasReactionBefore.find((item) => item.messageId === messageId)
                const hasReacted = userReaction?.reactions.includes(reactionType as "like" | "love" | "laugh")

                const reactionIcons = {
                    like: { Icon: ThumbsUp, activeColor: "text-primary-4" },
                    love: { Icon: Heart, activeColor: "text-red-500" },
                    laugh: { Icon: Smile, activeColor: "text-yellow-500" },
                }

                const { Icon, activeColor } = reactionIcons[reactionType as keyof typeof reactionIcons]

                const isAnimating =
                    animatingMessageId?.messageId === messageId && animatingMessageId?.reaction === reactionType

                const handleClick = () => {
                    handleReactionClick(messageId, reactionType)
                    if (!hasReacted) {
                        setAnimatingMessageId({ messageId, reaction: reactionType })
                        setTimeout(() => {
                            setAnimatingMessageId(null)
                        }, 1000)
                    }
                }

                return (
                    <span
                        key={reactionType}
                        onClick={handleClick}
                        className={`flex cursor-pointer items-center gap-1 ${
                            hasReacted ? "text-neutral-200" : "text-neutral-500 hover:motion-preset-pulse-sm"
                        }`}
                    >
                        <Icon
                            className={`h-4 w-4 ${hasReacted ? activeColor : ""} ${
                                isAnimating
                                    ? "motion-scale-loop-125 -motion-translate-y-loop-50 motion-duration-500 motion-ease-spring-bounciest"
                                    : ""
                            }`}
                        />
                        <span>{reactionType}</span>
                        <span>{count}</span>
                    </span>
                )
            })}
        </div>
    )
}

export default MessageReactions
