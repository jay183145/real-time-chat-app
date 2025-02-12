import apiFetch from "@/lib/fetch"
import * as T from "./type"

export async function getConversations() {
    return apiFetch<T.Conversation[]>({ url: "/conversations", method: "GET" })
}

// export async function createMessageToConversation(message: T.Message) {
//     return apiFetch<T.Message>({ url: "/conversations/messages/create", method: "POST", data: message })
// }
