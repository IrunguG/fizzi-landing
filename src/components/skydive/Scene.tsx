"use client";

import { useRef } from "react";
import * as THREE from "three"
import { Cloud, Clouds, Environment, Text } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { FloatingCan } from "../models/FloatingCan";
import { SodaCanProps } from "../models/SodaCan";
import { useMediaQuery } from "react-responsive";

type SceneProps = {
    sentence: string | null;
    flavor?: SodaCanProps["flavor"];
}

export const Scene = ({ sentence, flavor }: SceneProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const canRef = useRef<THREE.Group>(null);
    const cloud1Ref = useRef<THREE.Group>(null);
    const cloud2Ref = useRef<THREE.Group>(null);
    const cloudsRef = useRef<THREE.Group>(null);
    const wordsRef = useRef<THREE.Group>(null);

    const ANGLE = 75 * (Math.PI / 180);

    const getXPosition = (distance: number) => distance * Math.cos(ANGLE);
    const getYPosition = (distance: number) => distance * Math.sin(ANGLE);

    const getXYPosition = (distance: number) => ({
        x: getXPosition(distance),
        y: getYPosition(-1 * distance),
    });

    useGSAP(() => {
        if(
            !groupRef.current ||
            !canRef.current ||
            !cloud1Ref.current ||
            !cloud2Ref.current ||
            !cloudsRef.current ||
            !wordsRef.current
        )
        return;

        const can = canRef.current;
        const cloud1 = cloud1Ref.current;
        const cloud2 = cloud2Ref.current;
        const clouds = cloudsRef.current;
        const words = wordsRef.current;


        // Set the initial positions of objects in the scene
        gsap.set(clouds.position, { z: 10 })
        gsap.set(can.position, { ...getXYPosition(-4) })
        gsap.set(
            words.children.map((word) => word.position),
            { ...getXYPosition(7), z: 2 }
        )

        gsap.to(
            can.rotation,
            {
                y: Math.PI * 2,
                duration: 1.7,
                repeat: -1,
                ease: "none"
            }
        )

        const DISTANCE = 15;
        const DURATION = 6;

        gsap.set(
            [cloud1.position, cloud2.position],
            { ...getXYPosition(DISTANCE) }
        )

        gsap.to(
            cloud1.position,
            {
                y: `+=${getYPosition(DISTANCE * 2)}`,
                x: `+=${getXPosition(DISTANCE * -2)}`,
                ease: "none",
                repeat: -1,
                duration: DURATION
            }
        )

        gsap.to(
            cloud2.position,
            {
                y: `+=${getYPosition(DISTANCE * 2)}`,
                x: `+=${getXPosition(DISTANCE * -2)}`,
                ease: "none",
                repeat: -1,
                delay: DURATION / 2,
                duration: DURATION
            }
        )

        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".skydive",
                pin: true,
                start: "top top",
                end: "+=2000",
                scrub: 1.5
            }
        })

        scrollTl
            .to(
                "body",
                {
                    backgroundColor: "#C0F0F5",
                    overwrite: "auto",
                    duration: .1,
                }
            )
            .to(
                clouds.position,
                {
                    z: 0,
                    duration: .3
                }, 0
            )
            .to(
                can.position,
                {
                    x: 0, y: 0,
                    duration: 3,
                    ease: "back.out(1.7)"
                }
            )
            .to(
                words.children.map(word => word.position),
                {
                    keyframes: [
                        { x: 0, y: 0, z: -1 },
                        { ...getXYPosition(-7), z: -7 }
                    ],

                    stagger: .3
                }, 1
            )
            .to(
                can.position,
                {
                    ...getXYPosition(7),
                    duration: 0.5,
                    ease: "back.in(1.7)"
                }
            )

            .to(
                clouds.position,
                { z: 7, duration: 0.5 }
            )
    })

    return (
        <group ref={groupRef}>

            {/* Can */}
            <group rotation={[0, 0, 0.5]}>
                <FloatingCan
                    rotationIntensity={0}
                    floatIntensity={3}
                    floatSpeed={3}
                    ref={canRef}
                    flavor={flavor}
                />
            </group>
            
            {/* Clouds */}
            <Clouds ref={cloudsRef} material={THREE.MeshBasicMaterial}>
                <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
                <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
            </Clouds>

            {/* Text */}
            <group ref={wordsRef}>
                {sentence && <ThreeText sentence={sentence} color="#F97315" />}
            </group>

            {/* <OrbitControls /> */}

            {/* Lights */}
            <ambientLight intensity={2} color="#9DDEFA" />
            <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
        </group>
    )
}

function ThreeText({ sentence, color = "white" }: {
    sentence: string;
    color?: string;
}) {
    const words = sentence.toUpperCase().split(" ");

    const material = new THREE.MeshLambertMaterial();
    const isDesktop = useMediaQuery({ query: "(min-width: 950px" });

    return words.map((word: string, wordIndex: number) => (
        <Text
            key={`${wordIndex}-${word}`}
            scale={isDesktop ? 1 : 0.5}
            color={color}
            material={material}
            font="/fonts/Alpino-Variable.woff"
            fontWeight={900}
            anchorX={"center"}
            anchorY={"middle"}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?"
        >
            {word}
        </Text>
    ))
}