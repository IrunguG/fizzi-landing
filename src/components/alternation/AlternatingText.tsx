type AlternatingTextProps = {
    heading: string;
    description: string;
}

export const AlternatingText = ({ heading, description }: AlternatingTextProps) => {
    return (
        <div className="">
            <h2 className="text-balance text-6xl font-bold">{heading}</h2>
            <div className="mt-4 text-xl">
                <p className="text-balance text-neutral-700">{description}</p>
            </div>
        </div>
    )
}