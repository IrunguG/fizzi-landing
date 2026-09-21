"use client";

import { View } from "@react-three/drei";

import { Scene } from "./Scene"

export const SkydiveScene = () => {
    return (
        <View className="h-screen w-screen">
            <Scene flavor="blackCherry" sentence="DIVE INTO BETTER HEALTH" />
        </View>
    )
}