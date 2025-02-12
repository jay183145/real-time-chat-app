export interface Conversation {
    id: number
    participants: User[]
    lastMessage: string
    timestamp: number
}

export interface User {
    userId: number
    user: string
    avatar?: string
}
