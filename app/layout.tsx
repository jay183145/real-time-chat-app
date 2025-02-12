import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { cookies } from "next/headers"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const cookieStore = await cookies()
    const currentTheme = cookieStore.get("theme")

    return (
        <html lang="en">
            <body
                data-theme={currentTheme?.value}
                className={` ${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="mx-auto flex h-screen max-w-md flex-col bg-neutral-700">{children}</div>
            </body>
        </html>
    )
}
