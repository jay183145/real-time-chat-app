import cn from "@/utils/cn"
import { ButtonHTMLAttributes, useMemo } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline"
    size?: "xs" | "sm" | "lg"
}
export default function Button({ children, variant = "primary", size = "sm", className, ...props }: ButtonProps) {
    const classNameVariant = useMemo(() => {
        switch (variant) {
            case "primary":
                return "bg-primary-4 text-shades-100 hover:bg-primary-3"
            case "secondary":
                return "bg-neutral-600 text-neutral-100 hover:bg-neutral-700"
            case "outline":
                return "border border-neutral-400 bg-transparent text-neutral-400 hover:border-neutral-50 hover:text-neutral-50"
        }
    }, [variant])

    const classNameVariantDisabled = useMemo(() => {
        switch (variant) {
            case "primary":
                return "cursor-not-allowed bg-none bg-neutral-800 text-neutral-500"
            case "secondary":
                return "cursor-not-allowed bg-neutral-800 text-neutral-500"
            case "outline":
                return "cursor-not-allowed bg-neutral-800 text-neutral-500"
        }
    }, [variant])

    const classNameSize = useMemo(() => {
        switch (size) {
            case "lg":
                return "p-3 text-base font-semibold"
            case "sm":
                return "p-2 text-sm font-medium"
            case "xs":
                return "p-2 text-xs font-medium"
        }
    }, [size])

    return (
        <button
            className={cn(
                "flex items-center justify-center gap-2 rounded-full",
                classNameVariant,
                classNameSize,
                props.disabled && classNameVariantDisabled,
                className,
            )}
            {...props}
        >
            {children}
        </button>
    )
}
