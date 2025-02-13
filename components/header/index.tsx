"use client"

import React, { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Moon } from "lucide-react"
import { getTheme, setTheme, ThemeName } from "@/utils/theme"

type HeaderProps = {
    title: string
}

function Header({ title }: HeaderProps) {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        setIsDark(getTheme() === ThemeName.dark)
    }, [])

    const handleThemeChange = () => {
        const newTheme = getTheme() === ThemeName.dark ? ThemeName.light : ThemeName.dark
        setTheme(newTheme)
        setIsDark(newTheme === ThemeName.dark)
    }

    return (
        <header className="flex items-center justify-between bg-primary-5 p-4 text-neutral-800">
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
