import { LoaderCircle } from "lucide-react"
import React from "react"
import cn from "@/utils/cn"

type LoadingProps = {
    className?: string
}

function Loading({ className }: LoadingProps) {
    return (
        <div className="z-10 flex animate-[spin_1.5s_linear_infinite] flex-col items-center justify-center gap-4">
            <LoaderCircle className={cn("h-12 w-12 text-shades-100", className)} />
        </div>
    )
}

export default Loading
