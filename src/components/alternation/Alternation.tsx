"use client";

import { View } from "@react-three/drei";

import { AlternatingText } from "./AlternatingText";
import { textConstants } from "./textConstant";
import { Scene } from "./Scene";
import { cn } from "cn";

export const Alternation = () => {
    return (
        <section className="alternating-text-container relative bg-yellow-300">

            <div>
                <div className="grid relative z-100">
                    {/* The can scene */}
                    <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
                        <Scene />
                    </View>

                    {/* The text */}
                    {textConstants.map((item, index) => (
                        <div key={item.heading} className="alternating-section grid h-screen place-items-center px-2 md:px-10 gap-x-12 md:grid-cols-2">
                            <div className={cn(
                                        index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                                        "rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30"
                                    )}>
                                <AlternatingText
                                    heading={item.heading}
                                    description={item.description}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}