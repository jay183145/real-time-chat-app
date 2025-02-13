import { isServer } from "../constant/common"

const JWT_STORAGE_KEY = "jwtToken"

/**
 * 從 localStorage 取得 JWT Token
 */
export function getJwtToken(): string | null {
    // 若在 server side（例如 SSR），localStorage 可能不存在，直接回傳 null
    if (isServer) return null
    return localStorage.getItem(JWT_STORAGE_KEY)
}

/**
 * 設置 JWT Token，一般在 login 成功後調用
 * @param token JWT token 字串
 */
export function setJwtToken(token: string) {
    if (isServer) return
    localStorage.setItem(JWT_STORAGE_KEY, token)
}

/**
 * 清除 JWT Token
 */
export function clearJwtToken() {
    if (isServer) return
    localStorage.removeItem(JWT_STORAGE_KEY)
}
