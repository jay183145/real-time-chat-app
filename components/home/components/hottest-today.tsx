import { ChevronRight } from "lucide-react"
import React from "react"
import Image from "next/image"

function HottestToday() {
    return (
        <div className="mb-4 flex items-center justify-between">
            <div className="font-bold">今日人氣排行</div>
            <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-8 w-8 overflow-hidden rounded-full border-2 border-white">
                            <Image
                                src="/placeholder.svg"
                                alt={`Ranking ${i}`}
                                width={32}
                                height={32}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
        </div>
    )
}

export default HottestToday
