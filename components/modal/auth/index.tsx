"use client"

import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useAuthStore } from "@/lib/auth/auth-store"
import { AnimatePresence, motion } from "motion/react"
import Modal from "@/components/modal"
import { useAuthModalStore, AuthModalType } from "@/lib/store/auth-modal"

function AuthModal() {
    const search = useSearchParams()
    const { userInfo } = useAuthStore()
    const isAuth = !!userInfo

    const { type, modalStack, initAuthModal } = useAuthModalStore()
    const Content = type ? dynamic(() => import(`./contents/${type}`), { ssr: false }) : null
    console.log("type", type)
    console.log("modalStack", modalStack)

    // 初始化彈窗
    useEffect(() => {
        const auth = search.get("auth") as AuthModalType
        initAuthModal(auth)
    }, [initAuthModal, search])

    return !isAuth && Content ? (
        <Modal data-title="modal:auth">
            <AnimatePresence>
                <motion.div
                    className="fixed bottom-0 h-[88vh] w-full max-w-md overflow-hidden rounded-t-3xl"
                    transition={{ duration: 0.2, type: "tween" }}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                >
                    <div className="flex h-full flex-col">
                        <Content />
                    </div>
                </motion.div>
            </AnimatePresence>
        </Modal>
    ) : null
}

export default AuthModal
