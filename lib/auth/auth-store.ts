"use client"

import { create } from "zustand"
import { RegisterResponse, UserLoginResponse } from "@/lib/api/users/type"

interface AuthStore {
    userInfo: RegisterResponse | null
    token: string | null
    login: (userData: UserLoginResponse) => void
    logout: () => void
    checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
    userInfo: null,
    token: null,
    login: (userData: UserLoginResponse) => {
        set({ userInfo: userData.user, token: userData.token })
        localStorage.setItem("userInfo", JSON.stringify(userData.user))
        localStorage.setItem("token", userData.token)
    },

    logout: () => {
        set({ userInfo: null, token: null })
        localStorage.removeItem("userInfo")
        localStorage.removeItem("token")
    },

    checkAuth: async () => {
        try {
            const storedUser = localStorage.getItem("userInfo")
            const storedToken = localStorage.getItem("token")
            if (storedUser && storedToken) {
                set({ userInfo: JSON.parse(storedUser), token: storedToken })
            }
        } catch (error) {
            console.error("Auth check failed:", error)
        }
    },
}))
