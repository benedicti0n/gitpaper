import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Section from "./Section";
import { DotPattern } from "../magicui/dot-pattern";
import { Skeleton } from "../ui/skeleton";
import DownloadExtention from "../DownloadExtention/DownloadExtenion";

interface IWallpapers {
  extension: [
    {
      wallpaperId: string;
      githubUsername: string;
      bentoLink: string;
      backgroundImageLink: string;
    }
  ];
  mobile: [
    {
      wallpaperId: string;
      githubUsername: string;
      bentoLink: string;
      backgroundImageLink: string;
    }
  ];
  desktop: [
    {
      wallpaperId: string;
      githubUsername: string;
      bentoLink: string;
      backgroundImageLink: string;
    }
  ];
}

// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'IntrinsicAttributes & boolean'.
const DashboardPage = (isLoaded) => {
  const { user } = useUser();
  const userId = user?.id;

  const [wallpapers, setUserWallpapers] = useState<IWallpapers>();

  const fetchPreviewWallpapers = async () => {
    const cached = localStorage.getItem("cachedWallpapers");

    if (cached) {
      const parsed = JSON.parse(cached);
      console.log("Using cached wallpapers:", parsed);
      setUserWallpapers(parsed);
      return;
    }

    try {
      const response = await axios.post(
        "/api/v1/wallpaper/fetchPreviewWallpapers",
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        }
      );

      const data = response.data;

      if (data.success) {
        localStorage.setItem(
          "cachedWallpapers",
          JSON.stringify(data.wallpapers)
        );
        setUserWallpapers(data.wallpapers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPreviewWallpapers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center pt-24">
      <DotPattern height={40} width={40} />
      <div className="h-full w-4/5 relative z-20">
        <h1 className="text-4xl font-ChivoMedium pb-4">Create Wallpaper</h1>
        <div className="w-full grid grid-cols-2">
          <div className="mt-6  col-span-2">
            {!isLoaded ? (
              <div>
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            ) : (
              <Section heading="Extension" wallpapers={wallpapers?.extension} />
            )}
          </div>
        </div>
      </div>
      <DownloadExtention />
    </div>
  );
};

export default DashboardPage;
