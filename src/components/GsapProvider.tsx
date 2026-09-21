"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if(typeof window !== "undefined") {
    gsap.registerPlugin(SplitText, ScrollTrigger)
}

export default function GsapProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}