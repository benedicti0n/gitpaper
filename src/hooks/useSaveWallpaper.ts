import axios from "axios"
import { toPng } from "html-to-image"

export const useSaveWallpaper = () => {
    const saveWallpaper = async (formData: FormData) => {
        try {
            const response = await axios.post("/api/v1/wallpaper/saveWallpaper",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const result = await response.data;
            console.log("Wallpaper saved:", result);
        } catch (err) {
            console.error("Error uploading wallpaper:", err);
        }
    }

    const handleSave = async (componentRef: React.RefObject<HTMLDivElement | null>, userId: string | undefined, platform: string) => {
        if (!componentRef.current) {
            console.error("❌ Ref is null – component not mounted?");
            return;
        }

        try {
            //convert component to image data url
            const dataUrl = await toPng(componentRef.current!, {
                cacheBust: true,
                pixelRatio: 2,
                quality: 1,
                backgroundColor: '#e8e8e8',
                skipFonts: true, // prevents cross-origin font loading error
            });

            console.log("✅ Image Data URL:", dataUrl.slice(0, 100));
            console.log(componentRef.current!.innerHTML);

            //convert data url to blob for uploading
            const blob = await (await fetch(dataUrl)).blob()

            const refInnerHTML = componentRef.current?.innerHTML;

            const formData = new FormData()
            formData.append("image", blob)
            formData.append("platformOf", platform)
            formData.append("ref", JSON.stringify(refInnerHTML))
            formData.append("userId", userId || "")

            await saveWallpaper(formData)
            // navigate("/dashboard")
        } catch (err) {
            console.error(`Error exporting as `, err);
        }
    }

    return { handleSave }
}