import React from "react"
import SecondaryHeader, { NavbarProps } from "../header/secondary"

type SecondaryLayoutProps = {
    title: string
    children: React.ReactNode
    navProps?: Omit<NavbarProps, "title">
}

function SecondaryLayout({ title, children, navProps }: SecondaryLayoutProps) {
    return (
        <>
            <SecondaryHeader title={title} {...navProps} />
            {children}
        </>
    )
}

export default SecondaryLayout
