import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button"
import { HeroText } from "./HeroText";

export const Hero = () => {
    return (
        <section className="hero opacity-0">
            <div className="grid">
                <div className="grid h-screen place-items-center">
                    <div className="grid auto-rows-min place-items-center text-center">
                        <HeroText />
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
                    <div className="px-10">
                        <h2 className="text-6xl text-sky-600 lg:text-8xl font-extrabold text-side-heading text-balance">
                            TRY ALL FIVE FLAVORS
                        </h2>
                        <p className="text-black mt-4 max-w-xl text-xl text-balance text-side-body">
                            Our soda is made with real fruit juice and a touch of cane sugar. We never use artificial sweeteners or high fructose corn syrup. Try all five flavors and find your favorite!
                        </p>
                    </div>
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