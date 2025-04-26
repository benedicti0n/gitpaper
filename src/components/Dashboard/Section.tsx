import AvailableWallpaper from "./AvailableWallpaper"

interface SectionProps {
    heading: string
    wallpapers: [{
        wallpaperId: string,
        bentoLink: string,
        backgroundImageLink: string,
    }] | undefined
}

const Section = (props: SectionProps) => {
    return (
        <div className="w-full h-full flex flex-col">
            <h1 className="font-semibold text-3xl relative mb-2">
                {props.heading}
            </h1>
            <AvailableWallpaper platform={props.heading} wallpapers={props.wallpapers} />
        </div>
    )
}

export default Section