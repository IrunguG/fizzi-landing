"use client";

import dynamic from "next/dynamic";

export const DynamicHeroScene = dynamic(
    () => import ("@/components/Hero/HeroScene")
        .then((mod) => mod.HeroScene), 
    { ssr: false, }
);