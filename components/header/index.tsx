import React from "react"
import { Menu, UserCog } from "lucide-react"

type HeaderProps = {
    title: string
}

function Header({ title }: HeaderProps) {
    return (
        <header className="flex items-center justify-between p-4">
            <div className="flex gap-4">
                <button className="px-4 py-1">
                    <UserCog className="h-6 w-6" />
                </button>
            </div>
            <div className="text-xl font-bold">{title}</div>
            <button className="px-4 py-1">
                <Menu className="h-6 w-6" />
            </button>
        </header>
    )
}

export default Header
