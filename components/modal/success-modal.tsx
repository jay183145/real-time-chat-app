import React from "react"
import BaseModal from "."
import Button from "@/components/ui/button"
import { CircleX } from "lucide-react"

type SuccessModalProps = {
    successContent: string
    successButtonContent: string
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    onClick: () => void
}
function SuccessModal({ successContent, successButtonContent, isShow, setIsShow, onClick }: SuccessModalProps) {
    const handleClick = () => {
        onClick()
    }

    return (
        isShow && (
            <BaseModal onClick={() => setIsShow(false)}>
                <div className="absolute left-1/2 top-1/2 flex w-[250px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl bg-neutral-700">
                    <div className="flex w-full items-center justify-between rounded-t-2xl bg-success-3 px-4 py-3">
                        <CircleX className="invisible text-xl" />
                        <span className="text-center text-xl font-bold text-shades-100">成功!</span>
                        <CircleX className="cursor-pointer text-xl text-shades-100" onClick={() => setIsShow(false)} />
                    </div>
                    <div className="flex w-full flex-col items-center justify-center px-5 pb-8">
                        <div className="text-md py-5 text-center font-semibold text-shades-0">{successContent}</div>
                        <Button variant="primary" size="sm" className="w-full" onClick={handleClick}>
                            {successButtonContent}
                        </Button>
                    </div>
                </div>
            </BaseModal>
        )
    )
}

export default SuccessModal
