import React from "react"

function Banner() {
    return (
        <div className="bg-primary-2 relative m-4 cursor-pointer rounded-xl p-4">
            <div className="mb-2 flex flex-col items-center gap-2 text-xl font-bold">
                <span className="relative">
                    找尋新的交友圈
                    <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-400" />
                </span>
                <span className="text-primary-5 text-center">立即註冊送 1000 積分</span>
                <div className="text-sm opacity-80">時間: 2月10日 - 2月18日</div>
            </div>
        </div>
    )
}

export default Banner
