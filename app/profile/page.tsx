import RootLayout from "@/components/layout"
import React from "react"
import PersonalContent from "./components/personal-content"
import LogoutSection from "./components/logout-section"

function ProfilePage() {
    return (
        <RootLayout title="個人資訊">
            <PersonalContent />
            <LogoutSection />
        </RootLayout>
    )
}

export default ProfilePage
