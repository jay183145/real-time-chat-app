import { isServer } from "@/lib/constant/common"

/**
 * 從 localStorage 取得 JWT Token
 */
export function getJwtToken(): string | null {
    if (isServer) {
        return null
    }
    return localStorage.getItem("token")
}

/**
 * 設置 JWT Token，一般在 login 成功後調用
 * @param token JWT token 字串
 */
export function setJwtToken(token: string) {
    if (isServer) {
        return
    }
    localStorage.setItem("token", token)
}

/**
 * 清除 JWT Token
 */
export function clearJwtToken() {
    if (isServer) {
        return
    }
    localStorage.removeItem("token")
}
