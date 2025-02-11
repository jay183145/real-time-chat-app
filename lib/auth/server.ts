"use server"

import { cookies } from "next/headers"

export async function setJwtTokenServer(token: string) {
    const cookieStore = await cookies()
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })
}

export async function getJwtTokenServer() {
    const cookieStore = await cookies()
    return cookieStore.get("token")?.value
}

export async function clearJwtTokenServer() {
    const cookieStore = await cookies()
    cookieStore.delete("token")
}
