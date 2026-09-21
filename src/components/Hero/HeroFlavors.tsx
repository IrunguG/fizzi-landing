"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

export const HeroFlavors = () => {
    const flavorsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if(!flavorsRef.current) return;

        const split = SplitText.create(".text-side-heading", {
            type: "words,chars"
        })

        const flavorsTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
                invalidateOnRefresh: true,
            }
        })

        flavorsTl
            .to("body",
                {
                    backgroundColor: "#FDE047",
                    overwrite: "auto"
                }, 0
            )

            .from(split.chars,
                {
                    scale: 1.3,
                    y: 40,
                    rotate: -25,
                    opacity: 0,
                    stagger: .1,
                    ease: "back.out(3)",
                    duration: 0.5
                }
            )

            .from(".text-side-description",
                {
                    opacity: 0,
                    y: 20
                }
            )
            return () => split.revert()
    })

    return (
        <div ref={flavorsRef} className="px-10">
            <h2 className="text-6xl text-sky-600 lg:text-8xl font-extrabold text-side-heading text-balance">
                TRY ALL FIVE FLAVORS
            </h2>
            <p className="text-black mt-4 max-w-xl text-xl text-balance text-side-description">
                Our soda is made with real fruit juice and a touch of cane sugar. We never use artificial sweeteners or high fructose corn syrup. Try all five flavors and find your favorite!
            </p>
        </div>
    )
}