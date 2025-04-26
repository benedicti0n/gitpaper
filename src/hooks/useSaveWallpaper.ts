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

    const handleSave = async (componentRef: React.RefObject<HTMLDivElement | null>, userId: string | undefined, platform: string, backgroundImage: string | undefined) => {
        if (!componentRef.current) {
            console.error("❌ Ref is null – component not mounted?");
            return;
        }

        try {
            //convert component to image data url
            console.log("inside try block");

            const dataUrl = await toPng(componentRef.current!, {
                cacheBust: true,
                pixelRatio: 2,
                quality: 1,
                backgroundColor: '#e8e8e8',
                skipFonts: true,
            });

            console.log("✅ Image Data URL:", dataUrl.slice(0, 100));
            console.log(componentRef.current!.innerHTML);

            //convert data url to blob for uploading
            const blob = await (await fetch(dataUrl)).blob()

            const formData = new FormData()
            formData.append("bentoImage", blob)
            formData.append("platformOf", platform)
            if (backgroundImage && backgroundImage.startsWith('data:')) {
                const response = await fetch(backgroundImage);
                const backgroundBlob = await response.blob();
                formData.append("backgroundImage", backgroundBlob);
            } else if (backgroundImage) {
                formData.append("backgroundImageUrl", backgroundImage);
            }
            formData.append("userId", userId || "")

            await saveWallpaper(formData)
            // navigate("/dashboard")
        } catch (err) {
            console.error(`Error exporting as `, err);
        }
    }

    return { handleSave }
}