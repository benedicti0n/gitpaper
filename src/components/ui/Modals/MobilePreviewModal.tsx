import PhoneMockup from "@/components/magicui/Mockups/PhoneMockup";

const MobilePreviewModal = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <PhoneMockup>
            <img src={imageUrl} alt={imageUrl} className="w-full bg-cover" />
        </PhoneMockup>
    );
};

export default MobilePreviewModal; 