import RootLayout from "@/components/layout"
import Banner from "@/components/banner"
import ChatListSection from "@/components/home/chat-list-section"

export default function HomePage() {
    return (
        <RootLayout title="聊天室列表">
            {/* 活動 Banner */}
            <Banner />
            {/* 聊天室區塊 */}
            <ChatListSection />
        </RootLayout>
    )
}
