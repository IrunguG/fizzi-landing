"use client"

import { Environment } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { FloatingCan } from "../models/FloatingCan"
import { useMediaQuery } from "react-responsive";

export const Scene = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

    const canRef = useRef<Group>(null);

    const bgColors = ["#FFA685", "#E9CFF6", "#CBEF9A"];


    useGSAP(() => {
        if(!canRef.current) return;

        const sections = gsap.utils.toArray(".alternating-section");

        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".alternating-text-view",
                endTrigger: ".alternating-text-container",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                pin: true
            }
        });

        sections.forEach((_, index) => {
            if(!canRef.current) return;
            if(index === 0) return;

            const can = canRef.current;
            const isEven = index % 2 === 0;

            const xPosition = isDesktop ? (isEven ? "1" : "-1") : 0;
            const yRotation = isDesktop ? (isEven ? ".4" : "-.4") : 0;

            scrollTl
                .to(
                    can.position,
                    {
                        x: xPosition,
                        ease: "circ.inOut",
                        delay: 0.5
                    }
                )

                .to(
                    can.rotation,
                    {
                        x: yRotation,
                        ease: "back.inOut",
                    }, "<"
                )

                .to(
                    ".alternating-text-container",
                    {
                        backgroundColor: gsap.utils.wrap(bgColors, index)
                    }
                )
        })
    }, { dependencies: [isDesktop] })
    return (
        <group ref={canRef} position-x={isDesktop ? 1 : 0} rotation-y={isDesktop ? -0.3 : 0}>
            <FloatingCan flavor="strawberryLemonade" />
            <Environment files="hdr/lobby.hdr" environmentIntensity={1.6} />
        </group>
    )
}