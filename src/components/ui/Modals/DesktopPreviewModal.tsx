import DesktopMockup from "@/components/magicui/Mockups/DesktopMockup";

const DesktopPreviewModal = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <DesktopMockup>
            {/* eslint-disable-next-line */}
            <img src={imageUrl} alt={imageUrl} className="w-full h-full bg-cover" />
        </DesktopMockup>
    );
};

export default DesktopPreviewModal;  