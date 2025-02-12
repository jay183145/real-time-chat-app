import React from "react"
import Header from "../header"
import BottomNav from "../bottom-nav"

type RootLayoutProps = {
    title: string
    children: React.ReactNode
}

function RootLayout({ title, children }: RootLayoutProps) {
    return (
        <>
            <Header title={title} />
            <div className="overflow-y-auto">{children}</div>
            <BottomNav />
        </>
    )
}

export default RootLayout
