"use client"

import React, { useState } from "react"

function ChatInputSection() {
    const [inputValue, setInputValue] = useState("")

    const handleSend = () => {
        console.log(inputValue)
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
