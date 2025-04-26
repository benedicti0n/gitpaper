import BrowserMockup from "@/components/magicui/Mockups/BrowserMockup";
import { ReactNode } from "react";

interface IBrowserMockupProps {
    children?: ReactNode;
    bentoLink?: string;
    backgroundImageLink?: string;
    onClick?: () => void
}

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
                    className='w-full h-full flex justify-center items-center border rounded-b-xl'
                >
                    <img src={`${bentoLink}`} alt={`${bentoLink}`} className='w-[60%]' />
                </div>
            </BrowserMockup>
        </div>
    );
};

export default ExtensionPreviewModal; 