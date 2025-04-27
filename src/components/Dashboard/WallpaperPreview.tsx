import { useState } from "react"
import { useRouter } from "next/navigation";

import MiniButton from "../ui/MiniButton"
import { LucidePen, LucideTrash2 } from "lucide-react"
import BrowserMockup from "../magicui/Mockups/BrowserMockup";
// import SmallIPhoneMockup from "../magicui/Mockups/SmallIphoneMockup";
// import DesktopMockup from "../magicui/Mockups/DesktopMockup";
import PreviewModal from "../ui/Modals/PreviewModal";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from "axios";

interface IWallpaperPreview {
    wallpaperId: string;
    bentoLink: string;
    backgroundImageLink: string;
    platformOf: string;
    userId: string | undefined;
}

const WallpaperPreview = (props: IWallpaperPreview) => {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const previewWallpaper = () => {
        setIsModalOpen(true)
    }

    const platformOf = props.platformOf
    const wallpaperId = props.wallpaperId

    const deleteWallpaper = async () => {
        try {
            const response = await axios.post("/api/v1/wallpaper/deleteWallpaper",
                { wallpaperId, platformOf },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

            const data = await response.data
            if (data.success) {
                alert("Wallpaper deleted successfully")
                window.location.reload()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const modalContent = {
        extension: (
            <div className="w-72 rounded-xl mr-6">
                <BrowserMockup bentoLink={props.bentoLink} backgroundImageLink={props.backgroundImageLink} onClick={previewWallpaper} />
            </div>
        ),
        mobile: (
            <div className="rounded-xl mr-6">
                {/* <SmallIPhoneMockup bentoLink={props.bentoLink} backgroundImageLink={props.backgroundImageLink} onClick={previewWallpaper} /> */}
            </div>
        ),
        desktop: (
            <div className="w-72 rounded-xl mr-6">
                {/* <DesktopMockup bentoLink={props.bentoLink} backgroundImageLink={props.backgroundImageLink} onClick={previewWallpaper} /> */}
            </div>
        )
    }[props.platformOf] || null; // Default to null if no match


    return (
        <div className="relative">
            {modalContent}
            <div className="absolute top-0 right-6 m-1 z-30 flex">
                <MiniButton text="Edit" variant="default" className="mx-1" onClickFunction={() => { router.push(`/edit/${props.wallpaperId}`) }}><LucidePen className="h-4 w-4" /></MiniButton>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div>
                            <MiniButton text="Delete" variant="destructive">
                                <LucideTrash2 className="h-4 w-4" />
                            </MiniButton>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this
                                wallpaper and remove your wallpaper from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteWallpaper()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            {isModalOpen && <PreviewModal bentoLink={props.bentoLink} backgroundImageLink={props.backgroundImageLink} closeModal={() => setIsModalOpen(false)} platformOf={props.platformOf} />}
        </div>
    )
}

export default WallpaperPreview