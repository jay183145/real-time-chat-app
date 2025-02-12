import apiFetch from "@/lib/fetch"
import * as T from "./type"

export async function getMessages(messageParams: T.messageParams) {
    return apiFetch<T.Message[]>({
        url: "/messages",
        method: "GET",
        params: messageParams,
    })
}
