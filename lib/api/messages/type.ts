export interface Message {
    conversationId: number
    userId: number
    user: string
    avatar: string
    messageType: MessageType
    message: string
    reactions: Reaction
    timestamp: number
}

type MessageType = "text" | "image" | "system"

type Reaction = {
    like: number
    love: number
    laugh: number
}

export type messageParams = {
    conversationId: number
}
