import { LoaderCircle } from "lucide-react"

export default function ScreenLoading() {
    return (
        <div className="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center">
            <div className="fixed left-0 top-0 h-screen w-screen bg-black opacity-80" />
            <div className="z-10 flex animate-[spin_1.5s_linear_infinite] flex-col items-center justify-center gap-4">
                <LoaderCircle className="text-6xl text-white" />
            </div>
        </div>
    )
}
