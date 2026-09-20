import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button"
import { HeroHeading } from "./HeroHeading";
import { HeroFlavors } from "./HeroFlavors";

export const Hero = () => {
    return (
        <section className="hero opacity-0">
            <div className="grid">
                <div className="grid h-screen place-items-center">
                    <div className="grid auto-rows-min place-items-center text-center">
                        <HeroHeading />
                        <div className="hero-cta">
                            <Link href="/">
                                <Button
                                    className="p-8 mt-10 text-2xl rounded-xl font-semibold hover:bg-orange-400 bg-sky-400 text-neutral-800 uppercase transition-colors duration-250">
                                    Shop Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="grid text-side relative z-80 h-screen items-center gap-4 md:grid-cols-2">
                    <HeroFlavors />
                    <Image
                        src="/all-cans-bunched.png"
                        alt="cans"
                        width={700}
                        height={700}
                        loading="eager"
                        className="w-auto md:hidden"
                    />
                </div>
                
            </div>
        </section>
    )
}