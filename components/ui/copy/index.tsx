"use client"

import cn from "@/utils/cn"
import CopyBase from "./base"
import { Copy } from "lucide-react"

type CopyProps = {
    text: string
    className?: string
}

export default function CopyComponent({ text, className }: CopyProps) {
    return <CopyBase text={text} copyIcon={<Copy className={cn("h-4 w-4", className)} />} />
}
