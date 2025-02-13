"use client"

import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useAuthStore } from "@/lib/auth/auth-store"
import BaseModal from "@/components/modal"
import { useAuthModalStore, AuthModalType } from "@/lib/store/auth-modal"
import { CircleX } from "lucide-react"
import { LoaderCircle } from "lucide-react"

function AuthModal() {
    const search = useSearchParams()
    const { userInfo } = useAuthStore()
    const isAuth = !!userInfo

    const { type, modalStack, initAuthModal, closeModal } = useAuthModalStore()
    const Content = type
        ? dynamic(() => import(`./contents/${type}`), {
              ssr: false,
              loading: () => (
                  <div className="flex h-[260px] items-center justify-center p-8">
                      <LoaderCircle className="h-8 w-8 animate-spin rounded-full text-neutral-50" />
                  </div>
              ),
          })
        : null
    console.log("type", type)
    console.log("modalStack", modalStack)

    // 初始化彈窗
    useEffect(() => {
        const auth = search.get("auth") as AuthModalType
        initAuthModal(auth)
    }, [initAuthModal, search])

    return !isAuth && Content ? (
        <BaseModal data-title="modal:auth">
            <div className="absolute left-1/2 top-1/2 flex w-[280px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl bg-neutral-700">
                {/* 標題 */}
                <div className="flex w-full items-center justify-between rounded-t-2xl bg-primary-3 px-4 py-3">
                    <CircleX className="invisible text-xl" />
                    <span className="text-center text-xl font-bold text-shades-100">{type}</span>
                    <CircleX className="cursor-pointer text-xl text-shades-100" onClick={() => closeModal()} />
                </div>
                {/* 內容 */}
                <Content />
            </div>
        </BaseModal>
    ) : null
}

export default AuthModal
