import React from "react"
import RootLayout from "@/components/layout"
import ActivitySection from "./components/activity-section"

function ActivityPage() {
    return (
        <RootLayout title="動態">
            <ActivitySection />
        </RootLayout>
    )
}

export default ActivityPage
