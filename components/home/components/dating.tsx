"use client"

import { getConversations } from "@/lib/api/conversations"
import { Conversation } from "@/lib/api/conversations/type"
import React, { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth/auth-store"
import AuthAlert from "../../auth/alert"
import cn from "@/utils/cn"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

function DatingChatList() {
    const [chatList, setChatList] = useState<Conversation[]>([])
    const { userInfo } = useAuthStore()

    useEffect(() => {
        async function fetchChatList() {
            const { data, error } = await getConversations()
            if (error) {
                console.error(error)
            } else {
                const favoriteChatList = data.filter(
                    (chat) => !chat.participants.some((p) => p.user === userInfo?.user),
                )
                setChatList(favoriteChatList)
            }
        }
        fetchChatList()
    }, [userInfo?.user])

    const router = useRouter()
    const [isShowAuthAlert, setIsShowAuthAlert] = useState(false)
    function handleClickConversation(id: number) {
        if (!userInfo) {
            setIsShowAuthAlert(true)
            return
        }
        router.push(`/chat/${id}`)
    }

    return (
        <ul className="space-y-4">
            {chatList.map((chat) => {
                const participantsNames = chat.participants.map((p) => p.user).join(", ")
                // 暫時改成需求的時間
                // const participantNumber = `和其他${chat.participants.length > 3 ? ` ${chat.participants.length - 3} ` : ""}人也在線上`
                const activeTime = dayjs(chat.timestamp).format("MM/DD HH:mm")

                return (
                    <li
                        onClick={() => handleClickConversation(chat.id)}
                        key={chat.id}
                        className={cn(
                            "flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow",
                            "hover:motion-translate-x-out-[5%]",
                        )}
                    >
                        <div className="flex w-[200px] flex-col items-start justify-start">
                            <div className="flex w-[200px] items-center justify-between">
                                <p className="truncate text-sm font-semibold text-neutral-200">{participantsNames}</p>
                                <div className="flex items-center gap-1 text-nowrap px-2 text-xs font-semibold text-neutral-300">
                                    <span>{activeTime}</span>
                                </div>
                            </div>
                            <p className="w-[200px] truncate text-sm text-neutral-500">{chat.lastMessage}</p>
                        </div>
                        <div className="relative h-12 w-24">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={chat.participants[0].avatar}
                                alt={chat.participants[0].user}
                                className="absolute left-0 top-0 z-10 h-12 min-h-[48px] w-12 min-w-[48px] rounded-full border-2 border-neutral-200"
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={chat.participants[1].avatar}
                                alt={chat.participants[1].user}
                                className="absolute left-5 top-0 z-20 h-12 min-h-[48px] w-12 min-w-[48px] rounded-full border-2 border-neutral-200"
                            />
                            <ChevronRight className="absolute left-[68px] top-4 z-30 min-h-[12px] min-w-[12px] text-neutral-200" />
                        </div>
                    </li>
                )
            })}
            <AuthAlert isShow={isShowAuthAlert} setIsShow={setIsShowAuthAlert} />
        </ul>
    )
}

export default DatingChatList
