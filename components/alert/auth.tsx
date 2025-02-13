"use client"

import { useAuthModalStore } from "@/lib/store/auth-modal"
import React from "react"
import { AlertCircle } from "lucide-react"
import BaseModal from "@/components/modal"

type AuthAlertProps = {
    isShow: boolean
    setIsShow: (isShow: boolean) => void
}

function AuthAlert({ isShow, setIsShow }: AuthAlertProps) {
    const { closeAllModals, initAuthModal } = useAuthModalStore()

    function handleConfirm() {
        initAuthModal("login")
        closeAllModals()
        setIsShow(false)
    }
    function handleCancel() {
        closeAllModals()
        setIsShow(false)
    }
    return (
        isShow && (
            <BaseModal>
                <div className="fixed left-1/2 top-1/2 w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-neutral-800">
                    <div className="flex w-full items-center justify-center rounded-t-xl bg-warning-2 px-3 py-2 text-shades-100">
                        <AlertCircle className="h-5 w-5" />
                        <span className="pl-2">請先登入</span>
                    </div>
                    <div className="pb-4 pt-6 text-center text-sm">登入後即可加入聊天室</div>
                    <div className="h-px w-full bg-neutral-700" />
                    <div className="flex justify-center gap-2">
                        <button className="w-full p-2 text-center text-xs text-primary-4" onClick={handleCancel}>
                            取消
                        </button>
                        <div className="w-px bg-neutral-600" />
                        <button className="w-full p-2 text-center text-xs text-primary-4" onClick={handleConfirm}>
                            確定
                        </button>
                    </div>
                </div>
            </BaseModal>
        )
    )
}

export default AuthAlert
