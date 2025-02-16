import RootLayout from "@/components/layout"
import React from "react"
import PersonalContent from "./components/personal-content"

function ProfilePage() {
    return (
        <RootLayout title="個人資訊">
            <PersonalContent />
        </RootLayout>
    )
}

export default ProfilePage
