import { clearJwtToken, getJwtToken } from "../auth/jwt-client"
import { getJwtTokenServer } from "../auth/jwt-server"
import { isServer } from "../constant/common"
import { API_URL } from "../constant/env"
import { ApiError, ApiFetchOptions, ApiFetchResult } from "./type"

export default async function apiFetch<T>(options: ApiFetchOptions): Promise<ApiFetchResult<T>> {
    const request = await requestInterceptor(options)

    // 發送請求
    const result = await fetch(API_URL + request.url, { ...request.init, credentials: "include" })
        .then(responseInterceptor<T>)
        .catch((e: ApiError) => errorInterceptor(e, options))

    return result
}

export async function requestInterceptor(options: ApiFetchOptions): Promise<{ url: string; init: RequestInit }> {
    const { url, params, data, ...init } = options
    const finalUrl = new URL(url, API_URL)

    // Handle query parameters
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                finalUrl.searchParams.set(key, String(value))
            }
        })
    }

    // Set default headers
    const headers = new Headers(init.headers)
    headers.set("Content-Type", "application/json")

    if (isServer) {
        const token = await getJwtTokenServer()
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
    } else {
        // 若 localStorage 中存在 JWT token，則加入 Authorization 標頭
        const jwtToken = getJwtToken()
        if (jwtToken) {
            headers.set("Authorization", `Bearer ${jwtToken}`)
        }
    }

    return {
        url: finalUrl.pathname + finalUrl.search,
        init: {
            ...init,
            headers,
            body: data ? JSON.stringify(data) : undefined,
            credentials: "include",
        },
    }
}

async function responseInterceptor<T>(res: Response): Promise<{ data: T }> {
    const result: T = await res.json()
    if (!res.ok) throw result
    return { data: result }
}

async function errorInterceptor(error: ApiError, options: ApiFetchOptions): Promise<{ error: ApiError }> {
    if (isServer) console.log("fetch error", { error, options })
    if (error.code === 401) {
        clearJwtToken()
    }
    return { error }
}
