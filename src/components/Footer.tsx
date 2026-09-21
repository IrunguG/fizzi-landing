import CircleText from "./CircleText"
import { FizziLogo } from "./FizziLogo"

export const Footer = () => {
    return (
        <footer className="min-h-screen w-screen overflow-hidden bg-[#FE6334] text-[#FEE832]">
            <h2 className="grid w-full text-center py-10 gap-[3vw] font-black uppercase leading[.7]">
                <div className="text-[34vw]">Soda</div>
                <div className="grid gap-[3vw] text-[34vw] md:flex md:text-[11vw]">
                    <span className="inline-block">that </span>
                    <span className="inline-block max-md:text-[27vw]">makes </span>
                    <span className="inline-block max-md:text-[40vw]">you </span>
                </div>

                <div className="text-[32vw]">Smile</div>
            </h2>

            <div className="relative bg-sky-400 px-4 py-10 text-[#feac32] flex items-center justify-center">
                <FizziLogo className="cursor-pointer" />
                <div className="absolute right-24 top-0 size-28 origin-center -translate-y-14 md:size-48 md:-translate-y-28">
                    <CircleText />
                </div>
            </div>
        </footer>
    )
}