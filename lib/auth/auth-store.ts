"use client"

import { create } from "zustand"
import { RegisterResponse } from "@/lib/api/users/type"

interface AuthStore {
    userInfo: RegisterResponse | null
    isLoading: boolean
    login: (user: RegisterResponse) => void
    logout: () => void
    checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
    userInfo: null,
    isLoading: true,

    login: (userData: RegisterResponse) => {
        set({ userInfo: userData })
        localStorage.setItem("userInfo", JSON.stringify(userData))
    },

    logout: () => {
        set({ userInfo: null })
        localStorage.removeItem("userInfo")
    },

    checkAuth: async () => {
        try {
            const storedUser = localStorage.getItem("userInfo")
            if (storedUser) {
                set({ userInfo: JSON.parse(storedUser) })
            }
        } catch (error) {
            console.error("Auth check failed:", error)
        } finally {
            set({ isLoading: false })
        }
    },
}))
