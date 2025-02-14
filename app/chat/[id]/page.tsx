import React from "react"
import Image from "next/image"
import { getMessages } from "@/lib/api/messages"
import { redirect } from "next/navigation"
async function ChatPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params

    const { data: messages, error } = await getMessages({ conversationId: id })

    if (error?.code === 401) {
        console.error(error)
        redirect("/?auth=login")
    }

    return (
        <div className="flex h-screen flex-col">
            {/* 聊天訊息區域 */}
            <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
                {messages?.map((msg, index) => {
                    // 判斷是否為系統訊息
                    if (msg.messageType === "system") {
                        return (
                            <div key={index} className="mb-4 flex justify-center">
                                <div className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-500">
                                    {msg.message}
                                </div>
                            </div>
                        )
                    }

                    // const isCurrentUser = msg.userId === currentUserId
                    const isCurrentUser = true
                    return (
                        <div
                            key={index}
                            className={`mb-4 flex items-start ${isCurrentUser ? "justify-end" : "justify-start"}`}
                        >
                            {/* 他人訊息才顯示頭像，自己的訊息可以考慮放在右側或隱藏 */}
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

                            <div
                                className={`max-w-xs md:max-w-sm lg:max-w-md ${isCurrentUser ? "text-right" : "text-left"}`}
                            >
                                <div
                                    className={`rounded-xl p-2 ${
                                        isCurrentUser ? "bg-blue-500 text-white" : "bg-white"
                                    }`}
                                >
                                    {/* 如果是文字訊息 */}
                                    {msg.messageType === "text" && <p>{msg.message}</p>}

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
                                </div>

                                {/* 反應（reactions）示範，可以自行設計顯示 icon */}
                                {Object.keys(msg.reactions).length > 0 && (
                                    <div className="mt-1 flex gap-2 text-sm text-gray-500">
                                        {Object.entries(msg.reactions).map(([key, value]) => (
                                            <span key={key}>
                                                {key} {value}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* 時間顯示 (簡易示範) */}
                                <div className="mt-1 text-xs text-gray-400">
                                    {new Date(msg.timestamp).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* 輸入框區域 */}
            {/* <div className="border-t border-gray-200 bg-white p-4">
                <div className="flex">
                    <input
                        type="text"
                        className="flex-1 rounded-l border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="輸入訊息..."
                    />
                    <button
                        className="rounded-r bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        onClick={handleSend}
                    >
                        傳送
                    </button>
                </div>
            </div> */}
        </div>
    )
}

export default ChatPage
