"use client";

import { OrbitControls, View } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

import { Scene } from "../canvas/Scene";
import { Bubbles } from "../canvas/Bubbles";

export const HeroScene = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

    return (
        <>
            {isDesktop && 
                <View
                    className="hero-scene sticky top-0 z-50 hidden h-screen w-screen md:block"
                >
                    <Scene />
                    <Bubbles />
                    <OrbitControls />
                </View>}
        </>
    )
}