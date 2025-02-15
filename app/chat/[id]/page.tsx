import React from "react"
import MessageSection from "./components/message-section"
import SecondaryLayout from "@/components/layout/secondary"

async function ChatPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params

    return (
        <SecondaryLayout title="聊天室">
            {/* 聊天訊息區域 */}
            <MessageSection conversationId={id} />

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
        </SecondaryLayout>
    )
}

export default ChatPage
