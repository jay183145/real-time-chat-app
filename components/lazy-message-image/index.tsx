"use client"

import React, { useState, useRef, useEffect } from "react"
import Image, { ImageProps } from "next/image"

const LazyMessageImage: React.FC<ImageProps> = (props) => {
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true)
                        observer.disconnect()
                    }
                })
            },
            { threshold: 0.1 },
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [])

    return <div ref={containerRef}>{isVisible ? <Image {...props} alt={props.alt} /> : null}</div>
}

export default LazyMessageImage
