import React from "react"
import BaseModal from "."
import { CircleX, CircleAlert } from "lucide-react"

type ErrorModalProps = {
    error: string
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}
function ErrorModal({ error, isShow, setIsShow }: ErrorModalProps) {
    return (
        isShow && (
            <BaseModal onClick={() => setIsShow(false)}>
                <div className="absolute left-1/2 top-1/2 flex w-[250px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl bg-neutral-700">
                    <div className="flex w-full items-center justify-between rounded-t-2xl bg-red-400 px-4 py-3">
                        <CircleX className="invisible text-xl" />
                        <span className="text-center text-xl font-bold text-shades-100">發生錯誤!</span>
                        <CircleX className="cursor-pointer text-xl text-shades-100" onClick={() => setIsShow(false)} />
                    </div>
                    <div className="flex w-full flex-col items-center justify-center px-5 pb-8">
                        <div className="pb-3 pt-5">
                            <CircleAlert className="text-4xl text-red-500" />
                        </div>
                        <div className="text-md text-center font-semibold text-shades-0">{error}</div>
                    </div>
                </div>
            </BaseModal>
        )
    )
}

export default ErrorModal
