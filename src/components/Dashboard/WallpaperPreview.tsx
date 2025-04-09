import { useState } from "react"
import { useRouter } from "next/navigation";

import MiniButton from "../ui/MiniButton"
import { LucidePen, LucideTrash2 } from "lucide-react"
import BrowserMockup from "../magicui/Mockups/BrowserMockup";
import SmallIPhoneMockup from "../magicui/Mockups/SmallIphoneMockup";
import DesktopMockup from "../magicui/Mockups/DesktopMockup";
import ConfirmDeleteModal from "../ui/Modals/ConfirmDeleteModal";
import PreviewModal from "../ui/Modals/PreviewModal";

interface IWallpaperPreview {
    imageUrl: string;
    wallpaperId: string;
    platformOf: string;
    userId: string | undefined;
}

const WallpaperPreview = (props: IWallpaperPreview) => {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModal] = useState(false)

    const previewWallpaper = () => {
        setIsModalOpen(true)
    }

    const openDeleteConfirmModal = () => {
        setIsDeleteConfirmModal((prev) => !prev)
    }

    const modalContent = {
        extension: (
            <div className="w-72 rounded-xl mr-6">
                <BrowserMockup imageUrl={props.imageUrl} onClick={previewWallpaper} />
            </div>
        ),
        mobile: (
            <div className="rounded-xl mr-6">
                <SmallIPhoneMockup imageUrl={props.imageUrl} onClick={previewWallpaper} />
            </div>
        ),
        desktop: (
            <div className="w-72 rounded-xl mr-6">
                <DesktopMockup imageUrl={props.imageUrl} onClick={previewWallpaper} />
            </div>
        )
    }[props.platformOf] || null; // Default to null if no match


    return (
        <div className="relative">
            {modalContent}
            <div className="absolute top-0 right-6 m-1 z-30">
                <MiniButton text="Edit" variant="default" className="mx-1" onClickFunction={() => { router.push(`/edit/${props.wallpaperId}`) }}><LucidePen className="h-4 w-4" /></MiniButton>
                <MiniButton text="Delete" variant="destructive" onClickFunction={openDeleteConfirmModal}><LucideTrash2 className="h-4 w-4" /></MiniButton>
            </div>

            {isDeleteConfirmModalOpen && <ConfirmDeleteModal closeModal={() => setIsDeleteConfirmModal(false)} wallpaperId={props.wallpaperId} platformOf={props.platformOf} userId={props.userId} />}

            {isModalOpen && <PreviewModal imageUrl={props.imageUrl} closeModal={() => setIsModalOpen(false)} platformOf={props.platformOf} />}
        </div>
    )
}

export default WallpaperPreview