"use client";

import { ImageEntry, useLoadingStore } from "@/store";
import axios from "axios";
import { toPng } from "html-to-image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSaveWallpaper = () => {
  const { setLoading } = useLoadingStore();
  const router = useRouter();
  const saveWallpaper = async (formData: FormData) => {
    try {
      await axios.post(
        "/api/v1/wallpaper/saveWallpaper",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.removeItem("cachedWallpapers");

      setLoading(false);
      toast.success("Wallpaper Saved !");
      // eslint-disable-next-line
    } catch (err: any) {
      setLoading(false);

      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error || "Bad request");
        return;
      }

      console.error("Error uploading wallpaper:", err);
      toast.error("Something went wrong in saveWallpaper!");
    }
  };

  const handleSave = async (
    componentRef: React.RefObject<HTMLDivElement | null>,
    githubUsername: string | undefined,
    userId: string | undefined,
    platform: string,
    backgroundImage: string | undefined,
    theme: string,
    data: ImageEntry[]
  ) => {
    setLoading(true);
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
      });

      console.log("✅ Image Data URL:", dataUrl.slice(0, 100));

      //convert data url to blob for uploading
      const blob = await (await fetch(dataUrl)).blob();

      const formData = new FormData();
      formData.append("bentoImage", blob);
      formData.append("platformOf", platform);
      if (backgroundImage && backgroundImage.startsWith("data:")) {
        const response = await fetch(backgroundImage);
        const backgroundBlob = await response.blob();
        formData.append("backgroundImage", backgroundBlob);
      } else if (backgroundImage) {
        formData.append("backgroundImageUrl", backgroundImage);
      }
      formData.append("githubUsername", githubUsername as string);
      formData.append("userId", userId as string);
      formData.append("theme", theme);
      formData.append("bentoMiniImages", JSON.stringify(data));

      await saveWallpaper(formData);
      router.push("/dashboard");
    } catch (err) {
      console.error(`Error exporting as `, err);
      setLoading(false);
      toast.error("Something went wrong in handleSave!");
    }
  };

  return { handleSave };
};
