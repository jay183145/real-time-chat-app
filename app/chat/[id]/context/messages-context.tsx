"use client"

import { Message } from "@/lib/api/messages/type"
import { createContext, useContext, ReactNode, useState } from "react"

interface MessagesContextType {
    messages: Message[]
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined)

export function MessagesProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([])

    return <MessagesContext.Provider value={{ messages, setMessages }}>{children}</MessagesContext.Provider>
}

export function useMessages() {
    const context = useContext(MessagesContext)
    if (context === undefined) {
        throw new Error("useMessages must be used within a MessagesProvider")
    }
    return context
}
