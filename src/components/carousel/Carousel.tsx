"use client";

import { Center, Environment, View } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useRef, useState } from "react";
import { ArrowBigRightDashIcon } from "lucide-react";

import { SodaCanProps } from "../models/SodaCan";
import { FloatingCan } from "../models/FloatingCan";
import { WavyCircles } from "./WavyCircles";

const SPINS_ON_CHANGE = 8;

const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
  {
    flavor: "strawberryLemonade",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];


export const Carousel = () => {
    const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);

    const canRef = useRef<Group>(null);

    function changeFlavor(index: number) {
        if(!canRef.current) return

        const can = canRef.current;

        const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

        const tl = gsap.timeline();

        tl
            .to(
                can.rotation,
                {
                    y: index > currentFlavorIndex
                        ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
                        : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
                    ease: "power2.inOut",
                    duration: 1,
                }, 0
            )

            .to(
                ".background, .wavy-circles-outer, .wavy-circles-inner",
                {
                    backgroundColor: FLAVORS[nextIndex].color,
                    fill: FLAVORS[nextIndex].color,
                    ease: "power2.inOut",
                    duration: 1,
                }, 0
            )

            .to(
                ".text-wrapper",
                {
                    duration: 2,
                    y: -10,
                    opacity: 0
                }, 0
            )

            .to(
                {},
                { onStart: () => setCurrentFlavorIndex(nextIndex)},
                .5
            )

            .to(
                ".text-wrapper",
                {
                    duration: 2,
                    y: 0,
                    opacity: 1
                }, .7
            )
    }


    return (
        <section className="carousel h-screen relative grid grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white">
            <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

            <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />

            <h2 className="text-center text-5xl relative font-bold">Choose your flavor</h2>

            <div className="flex flex-1 items-center justify-between grid-cols-[auto,auto,auto] px-6 md:px-12">
                {/* left */}
                <ArrowButton
                    onClick={() => changeFlavor(currentFlavorIndex + 1)}
                    label="Previous Flavor"
                    direction="Left"
                />
                {/* can */}
                <View className="aspect-square h-[70vmin] min-h-40">
                    <Center position={[0, 0, 1.5]}>
                        <FloatingCan ref={canRef} floatIntensity={.3} flavor={FLAVORS[currentFlavorIndex].flavor} rotationIntensity={1} />
                    </Center>

                    <Environment files="/hdr/lobby.hdr" environmentIntensity={.6} environmentRotation={[0, 3, 0]} />
                    <directionalLight intensity={.6} position={[0, 1, 1]} />
                </View>
                {/* right */}

                <ArrowButton
                    onClick={() => changeFlavor(currentFlavorIndex - 1)}
                    label="Next Flavor"
                    direction="Right"
                />
            </div>

            <div className="text-area relative mx-auto text-center">
                <div className="text-wrapper text-4xl font-medium">
                    <p>{FLAVORS[currentFlavorIndex].name}</p>
                </div>
                <div className="mt-2 text-2xl font-normal opacity-90">
                    <p>12 cans - $22.99</p>
                </div>
            </div>
        </section>
    )
}

type ArrowButtonProps = {
    onClick: () => void;
    label: string;
    direction: "Right" | "Left";
}

function ArrowButton({ onClick, label, direction = "Right" }: ArrowButtonProps) {
    return (
        <button
            onClick={onClick}
            className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20 flex items-center justify-center cursor-pointer"
        >
            <ArrowBigRightDashIcon size={35} className={`${direction === "Left" && "scale-x-[-1]"}`} />
            <span className="sr-only">{label}</span>
        </button>
    )
}