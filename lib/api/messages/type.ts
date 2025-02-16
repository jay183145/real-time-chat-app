export interface Message {
    _id: string
    conversationId: number
    userId: number
    user: string
    avatar: string
    messageType: MessageType
    message: string
    reactions: Reaction
    timestamp: number
}

export type MessageType = "text" | "image" | "system"

type Reaction = {
    like: number
    love: number
    laugh: number
}

export type messageParams = {
    conversationId: number
}
