import RootLayout from "@/components/layout"
import Banner from "@/components/banner"
// import ChatList from "@/components/home/chat-list"
// import HottestToday from "@/components/home/hottest-today"
// import Favorite from "@/components/home/favorite"

export default function HomePage() {
    return (
        <RootLayout title="聊天室列表">
            {/* 活動 Banner */}
            <Banner />

            {/* 聊天室區塊 */}
            <div className="bg-primary-1 mx-4 mt-4 rounded-xl p-4">
                {/* 今日人氣排行 */}
                {/* <HottestToday /> */}
                {/* 收藏列表 */}
                {/* <Favorite /> */}
                {/* 聊天室列表 */}
                {/* <ChatList /> */}
            </div>
        </RootLayout>
    )
}
