"use client"

import { getApiUsers } from "@/lib/api/users"
import { RegisterResponse } from "@/lib/api/users/type"
import React, { useEffect, useState } from "react"
import Image from "next/image"

function ActivitySection() {
    const [users, setUsers] = useState<RegisterResponse[]>([])
    useEffect(() => {
        async function getUsers() {
            const { data, error } = await getApiUsers()
            if (error) {
                console.log(error)
            }
            setUsers(data || [])
            console.log(data)
        }
        getUsers()
    }, [])

    return (
        <div className="mx-auto mt-4 flex w-[370px] flex-col items-center justify-center gap-5 rounded-xl bg-primary-1 p-4">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="flex w-[300px] flex-col items-center justify-center rounded-lg bg-neutral-800 p-5 shadow transition-shadow duration-300 hover:shadow-lg"
                >
                    {/* 這裡放置使用者的大頭貼或封面照 */}
                    <Image
                        src={user.avatar}
                        width={200}
                        height={200}
                        alt={`${user.user} avatar`}
                        className="h-[200px] w-[200px] rounded-xl"
                    />

                    {/* 卡片內文 */}
                    <div className="p-4">
                        <h2 className="mb-1 text-xl font-semibold">{user.user}</h2>
                        <p className="mb-2 text-sm text-neutral-500">{user.email}</p>
                        <p className="text-xs text-neutral-400">
                            <span className="font-medium">建立時間：</span>
                            {new Date(user.createdAt).toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs text-neutral-400">
                            <span className="font-medium">更新時間：</span>
                            {new Date(user.updatedAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ActivitySection
