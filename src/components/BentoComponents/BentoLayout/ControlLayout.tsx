import React from "react";
import ColorPalleteControl from "../ColorPalleteControl";
import {
  useColorPaletteStore,
  useGithubDataStore,
  useImageUploadStore,
  useLoadingStore,
} from "@/store";
import { ImageUploadControl } from "@/components/ImageUploadControl";
import { Button } from "@/components/ui/button";
import { useSaveWallpaper } from "@/hooks/useSaveWallpaper";
import { useClerk, useSession, useUser } from "@clerk/nextjs";
import { useParams, usePathname, useRouter } from "next/navigation";

const ControlLayout = ({ bentoComponentRef }: { bentoComponentRef: React.RefObject<HTMLDivElement | null> }) => {
  const { isLoading, setLoading } = useLoadingStore()
  const { currentPalette } = useColorPaletteStore();
  const { data } = useImageUploadStore();
  const { githubData } = useGithubDataStore()
  const githubUsername = githubData?.userDetails.username
  const backgroundImageEntry = data.find(entry => entry.position === "Background");

  const { handleSave } = useSaveWallpaper();

  const { isSignedIn } = useSession();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const userId = isSignedIn ? user?.id : null;

  const router = useRouter();
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const { platform } = useParams<{ platform: string }>();

  return (
    <div
      className="flex items-center justify-center p-2 rounded-3xl mt-6 w-264 mb-10 relative z-20 "
      style={{
        background: `linear-gradient(to bottom right, ${currentPalette.main4}, ${currentPalette.main2}, ${currentPalette.main4})`,
        boxShadow: `0px 10px 20px -3px ${currentPalette.main3}`,
        color: `${currentPalette.textColor}`,
      }}
    >
      <div
        className="w-full p-6 rounded-2xl bg-gray-100 shadow-lg flex gap-6"
        style={{ background: `${currentPalette.bgColor}` }}
      >
        {/* Color Palette Selection */}
        <div className="w-1/2 p-5 rounded-xl font-[ChivoRegular] flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-[ChivoMedium] font-semibold mb-4 invert">
              Choose Color Pallete
            </h3>
            <ColorPalleteControl />
          </div>
          <Button
            disabled={isLoading}
            className="bg-white text-black hover:text-white w-full"
            onClick={async () => {
              if (!isSignedIn) {
                openSignIn();
                return;
              }

              if (isHomepage) {
                router.push("/dashboard");
              } else if (userId && platform) {
                setLoading(true)
                await handleSave(bentoComponentRef, githubUsername, userId, platform, backgroundImageEntry?.imgUrl, currentPalette.name, data);
                setLoading(false)
              }
            }}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>

        {/* Image Upload Section */}
        <div
          className="w-1/2 p-5 rounded-xl shadow-md font-[ChivoRegular]"
          style={{
            background: `${currentPalette.main1}`,
            color: `${currentPalette.textColor}`,
          }}
        >
          <h3 className="text-xl font-[ChivoMedium] font-semibold mb-4">
            Upload Images
          </h3>
          <ImageUploadControl />
        </div>
      </div>
    </div>
  );
};

export default ControlLayout;
