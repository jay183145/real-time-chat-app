import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { cookies } from "next/headers"
import { AuthProvider } from "@/lib/auth/context"
import AuthModal from "@/components/auth"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Kyle Lan's Chat app",
    description: "Chat app make by Kyle Lan",
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
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                style={{
                    backgroundImage: "url('/chat-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="mx-auto flex h-screen max-w-md flex-col bg-neutral-700">
                    <AuthProvider>{children}</AuthProvider>
                    <AuthModal />
                </div>
            </body>
        </html>
    )
}
