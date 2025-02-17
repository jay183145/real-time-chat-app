type CopyProps = {
    text: string
    copyIcon: React.ReactNode
}
export default function CopyBase({ text, copyIcon }: CopyProps) {
    const copyToClipboard = () => {
        if (text) {
            console.log("copied")
            navigator.clipboard.writeText(text)
        }
    }

    return (
        <div className="cursor-pointer" onClick={() => copyToClipboard()}>
            {copyIcon}
        </div>
    )
}
