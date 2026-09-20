"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

export const HeroText = () => {
    useGSAP(() => {
        const split = SplitText.create(".hero-heading", {
            type: "words, chars"
        });

        const introTl = gsap.timeline();

        introTl
            .set(".hero", { opacity: 1 })
            .from(split.words, {
                opacity: 0,
                scale: 3,
                ease: "power4.in",
                delay: 0.3,
                stagger: 1
            })
            .from(".hero-subheading", {
                opacity: 0,
                y: 30
            }, "+=.8")
            .from(".hero-description", {
                opacity: 0,
                y: 10,
            })
            .from(".hero-cta", {
                opacity: 0,
                y: 80,
                ease: "bounce.out"
            })

            return () => split.revert()
    })


    return (
        <div className="space-y-5">
            <h1 className="hero-heading space-y-2 leading-[.8] uppercase text-7xl lg:text-9xl font-bold text-orange-400">
                LIVE
                <br />
                GUTSY
            </h1>
            <h3
                className="hero-subheading mt-12 text-4xl font-semibold text-sky-800 lg:text-6xl">
                Soda Perfected</h3>

            <p className="hero-description text-2xl">3-5g sugar, 9g fiber. 5 delicious flavors</p>
        </div>
    )
}