"use client";

import { View } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

import { Scene } from "../canvas/Scene";
import { Bubbles } from "../canvas/Bubbles";

export const HeroScene = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

    return (
        <>
            {isDesktop && 
                <View
                    className="hero-scene pointer-events-none sticky top-0 z-50 mt-[-100vh] hidden h-screen w-screen md:block"
                >
                    <Scene />
                    <Bubbles />
                </View>}
        </>
    )
}