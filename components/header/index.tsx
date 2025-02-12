"use client"

import React, { useState } from "react"
import { Menu } from "lucide-react"
import { Switch } from "@/components/switch"
import { Moon } from "lucide-react"
import { getTheme, setTheme, ThemeName } from "@/utils/theme"

type HeaderProps = {
    title: string
}

function Header({ title }: HeaderProps) {
    const [isDark, setIsDark] = useState(getTheme() === ThemeName.dark)

    const handleThemeChange = () => {
        const newTheme = isDark ? ThemeName.light : ThemeName.dark
        setTheme(newTheme)
        setIsDark(!isDark)
    }

    return (
        <header className="bg-primary-5 flex items-center justify-between p-4 text-neutral-800">
            <button className="px-4 py-1">
                <Menu className="h-6 w-6" />
            </button>
            <div className="text-xl font-bold">{title}</div>
            <div className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <Switch checked={isDark} onCheckedChange={handleThemeChange} />
            </div>
        </header>
    )
}

export default Header
