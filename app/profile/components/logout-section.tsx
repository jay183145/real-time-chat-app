"use client"
import React from "react"
import { useAuthStore } from "@/lib/auth/auth-store"
import Button from "@/components/ui/button"
function LogoutSection() {
    const { logout, userInfo } = useAuthStore()

    if (!userInfo) return null
    return (
        <div className="flex justify-end px-6 py-3">
            <Button className="w-full" variant="outline" onClick={logout}>
                登出
            </Button>
        </div>
    )
}

export default LogoutSection
