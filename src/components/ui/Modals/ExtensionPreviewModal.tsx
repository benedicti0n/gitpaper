import BrowserMockup from "@/components/magicui/Mockups/BrowserMockup";
import { ReactNode } from "react";

interface IBrowserMockupProps {
    children?: ReactNode;
    bentoLink?: string;
    backgroundImageLink?: string;
    onClick?: () => void
}

// eslint-disable-next-line
const ExtensionPreviewModal = ({ children, bentoLink, backgroundImageLink, onClick }: IBrowserMockupProps) => {
    return (
        <div className="w-full h-full py-20">
            <BrowserMockup>
                <div style={{
                    backgroundImage: `url(${backgroundImageLink})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
                    className='w-full h-full flex justify-center items-center rounded-xl'
                >
                    {/* eslint-disable-next-line */}
                    <img src={`${bentoLink}`} alt={`${bentoLink}`} className='w-[60%]' />
                </div>
            </BrowserMockup>
        </div>
    );
};

export default ExtensionPreviewModal; 