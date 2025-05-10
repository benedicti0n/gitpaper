import MiniButton from "../ui/MiniButton";
import WallpaperPreview from "./WallpaperPreview";
import { LucidePlus } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

interface IPlatformDetails {
  platform: string;
  wallpapers:
    | [
        {
          wallpaperId: string;
          githubUsername: string;
          bentoLink: string;
          backgroundImageLink: string;
        }
      ]
    | undefined;
}

const AvailableWallpaper = (props: IPlatformDetails) => {
  const router = useRouter();
  const platform = props.platform.toLowerCase();

  const { user } = useUser();
  const userId = user?.id;

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      {props.platform === "Extension" ? (
        <>
          {/* Map wallpapers */}
          <div className="flex flex-wrap gap-4 w-full justify-start">
            {props.wallpapers &&
              props.wallpapers
                .filter(
                  (wallpaper) =>
                    wallpaper.wallpaperId &&
                    wallpaper.bentoLink &&
                    wallpaper.backgroundImageLink
                )
                .map((wallpaper) => (
                  <WallpaperPreview
                    key={wallpaper.wallpaperId}
                    wallpaperId={wallpaper.wallpaperId}
                    githubUsername={wallpaper.githubUsername}
                    bentoLink={wallpaper.bentoLink}
                    backgroundImageLink={wallpaper.backgroundImageLink}
                    platformOf={platform}
                    userId={userId}
                  />
                ))}
            <div className="flex justify-center items-center">
              <MiniButton
                text="Add new wallpaper"
                variant="default"
                onClickFunction={() => router.push(`/${platform}/create`)}
                disabled={props.wallpapers && props.wallpapers.length >= 3}
              >
                <LucidePlus className="h-6 w-6" />
              </MiniButton>
            </div>
          </div>
        </>
      ) : (
        <div className="h-full w-full flex items-center">
          <h1 className="text-lg font-semibold text-gray-500">Coming Soon</h1>
        </div>
      )}
    </div>
  );
};

export default AvailableWallpaper;
