"use client";

import { Environment } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { FloatingCan } from "@/components/models/FloatingCan";
import { useHeroStore } from "@/lib/store/useHeroStore";

export const Scene = () => {
    const { isReady } = useHeroStore();

    const cherryRef = useRef<Group>(null);
    const strawberryRef = useRef<Group>(null);
    const melonRef = useRef<Group>(null);
    const lemonLimeRef = useRef<Group>(null);
    const grapeRef = useRef<Group>(null);

    const lemonLimeGroupRef = useRef<Group>(null);
    const cherryGroupRef = useRef<Group>(null);

    const groupRef = useRef<Group>(null);

    const FLOAT_SPEED = 1.5;

    useGSAP(() => {
        if(
            !cherryRef.current ||
            !strawberryRef.current ||
            !melonRef.current ||
            !lemonLimeRef.current ||
            !grapeRef.current ||
            !lemonLimeGroupRef.current ||
            !cherryGroupRef.current ||
            !groupRef.current)
        return;

        isReady();

        const cherry = cherryRef.current;
        const strawberry = strawberryRef.current;
        const lemonLime = lemonLimeRef.current;
        const grape = grapeRef.current;
        const melon = melonRef.current;

        const lemonLimeGroup = lemonLimeGroupRef.current;
        const cherryGroup = cherryGroupRef.current;
        const group = groupRef.current;

        gsap.set(cherry.position, { x: -1.5 });
        gsap.set(cherry.rotation, { z: -0.5 });

        gsap.set(lemonLime.position, { x: 1.5 });
        gsap.set(lemonLime.rotation, { z: 0.5 });

        gsap.set(grape.position, { y: 5, z: 2 });
        gsap.set(strawberry.position, { x: 2, y: 4, z: 2 });
        gsap.set(melon.position, { y: -5 });

        const introTl = gsap.timeline({
            defaults: {
                duration: 2,
                ease: "power2.in"
            }
        });

        introTl
            .fromTo(cherryGroup.position, { y: -5, x: 1 }, { x: 2.5, y: 0, z: 1.25 }, 0)
            .from(cherryGroup.rotation, { z: 3 }, 0)
            .fromTo(lemonLimeGroup.position, { y: 5, x: 1 }, { x: -2.5, y: 0, z: -1.25 }, 0)
            .from(lemonLimeGroup.rotation, { z: 3 }, 0);
        
        const scrollTl = gsap.timeline({
            defaults: {
                duration: 2,
            },

            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5
            }
        });

        scrollTl
            .to(group.rotation, { y: Math.PI * 2 })

            .to(cherry.position, { x: 0.5, y: -7, z: -2 }, 0)
            .to(cherry.rotation, { z: 0 }, 0)

            .to(lemonLime.position, {  }, 0)
            .to(lemonLime.rotation, {  }, 0)

            .to(grape.position, {  }, 0)
            .to(grape.rotation, {  }, 0)

            .to(strawberry.position, {  }, 0)
            .to(strawberry.rotation, {  }, 0)

            .to(melon.position, {  }, 0)
            .to(melon.rotation, {  }, 0)
    })

    return (
        <group ref={groupRef}>
            <group ref={cherryGroupRef}>
                <FloatingCan
                    ref={cherryRef}
                    flavor="blackCherry"
                    floatSpeed={FLOAT_SPEED}
                />
            </group>

            <group ref={lemonLimeGroupRef}>
                <FloatingCan
                    ref={lemonLimeRef}
                    flavor="lemonLime"
                    floatSpeed={FLOAT_SPEED}
                />
            </group>

            <FloatingCan
                ref={grapeRef}
                flavor="grape"
                floatSpeed={FLOAT_SPEED}
            />

            <FloatingCan
                ref={strawberryRef}
                flavor="strawberryLemonade"
                floatSpeed={FLOAT_SPEED}
            />

            <FloatingCan
                ref={melonRef}
                flavor="watermelon"
                floatSpeed={FLOAT_SPEED}
            />
            <Environment files="/hdr/lobby.hdr" />
        </group>
    )
}