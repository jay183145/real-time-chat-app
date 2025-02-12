import React from "react"

function Favorite() {
    return (
        <div className="mb-4 flex justify-between">
            {[
                { icon: "⭐", label: "收藏", color: "text-yellow-500" },
                { icon: "🔥", label: "熱門", color: "text-red-500" },
                { icon: "💝", label: "交友", color: "text-pink-500" },
                { icon: "📻", label: "Podcast", color: "text-blue-500" },
            ].map((item) => (
                <button key={item.label} className="flex flex-col items-center gap-1">
                    <span className="text-xl">{item.icon}</span>
                    <span className={`text-sm ${item.color}`}>{item.label}</span>
                </button>
            ))}
        </div>
    )
}

export default Favorite
