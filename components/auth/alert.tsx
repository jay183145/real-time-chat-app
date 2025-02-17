"use client"

import { useAuthModalStore } from "@/lib/store/auth-modal"
import React, { useEffect, useState } from "react"
import BaseModal from "@/components/modal"
import { useRouter } from "next/navigation"
import CopyComponent from "../ui/copy"
import { getApiUsers } from "@/lib/api/users"
import { RegisterResponse } from "@/lib/api/users/type"

type AuthAlertProps = {
    isShow: boolean
    setIsShow: (isShow: boolean) => void
}

function AuthAlert({ isShow, setIsShow }: AuthAlertProps) {
    const router = useRouter()
    const { closeAllModals, initAuthModal } = useAuthModalStore()
    const [users, setUsers] = useState<RegisterResponse[]>([])

    function handleConfirm() {
        initAuthModal("login")
        router.push("?auth=login")
        closeAllModals()
        setIsShow(false)
    }
    function handleCancel() {
        closeAllModals()
        setIsShow(false)
        router.push("/")
    }

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
        isShow && (
            <BaseModal>
                <div className="fixed left-1/2 top-1/2 w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-neutral-800">
                    <div className="flex w-full items-center justify-center rounded-t-xl bg-primary-3 px-3 py-2">
                        <span className="font-semibold text-shades-100">請先登入</span>
                    </div>
                    {/* 登入後馬上聊天 暫時改成所有人的帳密 */}
                    {users.length > 0 && (
                        <div className="flex flex-col gap-2 p-4">
                            <div className="text-sm text-neutral-400">以下為預設使用者也可以自己註冊</div>
                            <div className="font-semibold text-shades-0">帳號</div>
                            {users.map((user) => {
                                return (
                                    <div key={user.id} className="flex items-center justify-between">
                                        <span className="text-neutral-400">{user.email}</span>
                                        <CopyComponent text={user.email} />
                                    </div>
                                )
                            })}
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-shades-0">密碼</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-neutral-400">123456</span>
                                    <CopyComponent text={"123456"} />
                                </div>
                            </div>
                        </div>
                    )}
                    {users.length === 0 && <div className="pb-4 pt-6 text-center">登入後馬上聊天</div>}
                    <div className="h-px w-full bg-neutral-700" />
                    <div className="flex justify-center gap-2">
                        <button className="w-full p-2 text-center text-sm text-primary-4" onClick={handleCancel}>
                            取消
                        </button>
                        <div className="w-px bg-neutral-600" />
                        <button className="w-full p-2 text-center text-sm text-primary-4" onClick={handleConfirm}>
                            確定
                        </button>
                    </div>
                </div>
            </BaseModal>
        )
    )
}

export default AuthAlert
