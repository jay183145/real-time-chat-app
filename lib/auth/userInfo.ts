import { RegisterResponse } from "../api/users/type"
import { isServer } from "../constant/common"

export function getUserInfo(): RegisterResponse | null {
    if (isServer) return null
    const userInfo = localStorage.getItem("userInfo")
    return userInfo ? JSON.parse(userInfo) : null
}

export function setUserInfo(userInfo: RegisterResponse) {
    if (isServer) return
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
}
