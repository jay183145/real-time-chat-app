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

// 定義常數
const REACTION_ICONS = {
    like: { Icon: ThumbsUp, activeColor: "text-primary-4" },
    love: { Icon: Heart, activeColor: "text-red-500" },
    laugh: { Icon: Smile, activeColor: "text-yellow-500" },
} as const

type ReactionType = keyof typeof REACTION_ICONS

function MessageReactions({ reactions, messageId, isCurrentUser, setMessages }: MessageReactionsProps) {
    const [animatingMessageId, setAnimatingMessageId] = useState<{ messageId: string; reaction: string } | null>(null)
    const [messagesHasReactionBefore, setMessagesHasReactionBefore] = useState<MessageHasReactionBefore[]>([])

    function handleReactionClick(messageId: string, reaction: ReactionType) {
        setMessages((prevMessages) =>
            prevMessages.map((msg) => {
                if (msg._id !== messageId) return msg

                const userReactions = messagesHasReactionBefore.find((item) => item.messageId === messageId)
                const hasReacted = userReactions?.reactions.includes(reaction)
                const updatedReactions = { ...msg.reactions }

                if (hasReacted) {
                    // 取消反應
                    updatedReactions[reaction] = (updatedReactions[reaction] || 0) - 1
                    setMessagesHasReactionBefore((prev) =>
                        prev.map((item) =>
                            item.messageId === messageId
                                ? { ...item, reactions: item.reactions.filter((r) => r !== reaction) }
                                : item,
                        ),
                    )
                } else {
                    // 新增反應
                    updatedReactions[reaction] = (updatedReactions[reaction] || 0) + 1
                    setMessagesHasReactionBefore((prev) => {
                        const existingIndex = prev.findIndex((item) => item.messageId === messageId)
                        const newReactions = [...(userReactions?.reactions || []), reaction]

                        if (existingIndex !== -1) {
                            return prev.map((item) =>
                                item.messageId === messageId ? { ...item, reactions: newReactions } : item,
                            )
                        }
                        return [...prev, { messageId, reactions: newReactions }]
                    })
                }

                return { ...msg, reactions: updatedReactions }
            }),
        )
    }

    return (
        <div
            className={`mt-1 flex gap-2 text-sm motion-translate-y-in-100 motion-blur-in-md motion-opacity-in-0 ${
                isCurrentUser ? "justify-end" : "justify-start"
            }`}
        >
            {Object.entries(reactions).map(([reactionType, count]) => {
                const userReaction = messagesHasReactionBefore.find((item) => item.messageId === messageId)
                const hasReacted = userReaction?.reactions.includes(reactionType as ReactionType)
                const { Icon, activeColor } = REACTION_ICONS[reactionType as ReactionType]
                const isAnimating =
                    animatingMessageId?.messageId === messageId && animatingMessageId?.reaction === reactionType

                const handleClick = () => {
                    handleReactionClick(messageId, reactionType as ReactionType)
                    if (!hasReacted) {
                        setAnimatingMessageId({ messageId, reaction: reactionType })
                        setTimeout(() => setAnimatingMessageId(null), 1000)
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
