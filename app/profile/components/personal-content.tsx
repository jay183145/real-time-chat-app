"use client"

import React from "react"
import { useAuthStore } from "@/lib/auth/auth-store"
import Image from "next/image"

function PersonalContent() {
    const { userInfo } = useAuthStore()

    return (
        <div className="mx-auto max-w-2xl p-6">
            <div className="rounded-lg bg-white p-6 shadow-md">
                <h1 className="mb-6 text-2xl font-bold">個人資料</h1>

                <div className="space-y-4">
                    {/* 用戶基本信息 */}
                    <div className="flex items-center space-x-4">
                        {userInfo?.avatar && (
                            <Image
                                src={userInfo.avatar}
                                alt="用戶頭像"
                                className="h-20 w-20 rounded-full object-cover"
                                width={80}
                                height={80}
                            />
                        )}
                        <div>
                            <h2 className="text-xl font-semibold">{userInfo?.user || "未設置姓名"}</h2>
                            <p className="text-gray-600">{userInfo?.email || "未設置郵箱"}</p>
                        </div>
                    </div>

                    {/* 詳細信息 */}
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <p className="text-gray-600">用戶 ID</p>
                            <p className="font-medium">{userInfo?.userId || "未知"}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-600">註冊時間</p>
                            <p className="font-medium">
                                {userInfo?.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : "未知"}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-600">最後更新時間</p>
                            <p className="font-medium">
                                {userInfo?.updatedAt ? new Date(userInfo.updatedAt).toLocaleDateString() : "未知"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalContent
