"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import cn from "@/utils/cn"

// 返回按鈕用到的
type BackIcon = {
    onBack?: () => void
    backPath?: string
    replace?: boolean
    showBack?: boolean
}

export type NavbarProps = {
    rightElement?: React.ReactNode
    title: string
} & BackIcon

function SecondaryHeader({ title, onBack, rightElement, backPath, replace = false, showBack = true }: NavbarProps) {
    const router = useRouter()

    const handleBack = () => {
        if (backPath) {
            if (replace) router.replace(backPath)
            else router.push(backPath)
        } else if (onBack) onBack()
        else router.back()
    }

    return (
        <div className={cn("flex items-center justify-between bg-primary-5 p-4")}>
            <div role="left-element" className="flex h-8 w-8 cursor-pointer items-center justify-center">
                {showBack ? <ChevronLeft onClick={handleBack} className="h-8 w-8 text-shades-100" /> : undefined}
            </div>

            <div role="middle-element" className="text-lg font-semibold">
                <p className="text-xl font-semibold text-shades-100">{title}</p>
            </div>

            <div role="right-element" className="h-8 w-8">
                {rightElement}
            </div>
        </div>
    )
}

export default SecondaryHeader
