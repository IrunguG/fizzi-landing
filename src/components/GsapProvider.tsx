"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect } from "react";

export default function GsapProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if(typeof window !== "undefined") {
            gsap.registerPlugin(SplitText)
        }
    }, [])

    return <>{children}</>
}