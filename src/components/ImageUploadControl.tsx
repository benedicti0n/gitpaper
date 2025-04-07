import { useEffect, useState } from "react";
import { Position, useImageUploadStore } from "@/store";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/Input";

export function ImageUploadControl() {
    const [imgUrl, setImgUrl] = useState("");
    const [selectedPosition, setSelectedPosition] = useState<Position | "">("");
    const { setData } = useImageUploadStore();

    const handlePositionChange = (position: string) => {
        setSelectedPosition(position as Position);
        if (imgUrl) {
            setData(position as Position, imgUrl);
        }
    };


    const handleImageUrlChange = (url: string) => {
        setImgUrl(url);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImgUrl(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (selectedPosition && imgUrl) {
            setData(selectedPosition, imgUrl);
        }
    }, [selectedPosition, imgUrl, setData]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <div className="w-full text-black">
                    <Select onValueChange={(val) => handlePositionChange(val as Position)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Top Left">Top Left</SelectItem>
                            <SelectItem value="Top Right">Top Right</SelectItem>
                            <SelectItem value="Right Side">Right Side</SelectItem>
                            <SelectItem value="Bottom Left">Bottom Left</SelectItem>
                            <SelectItem value="Background">Background</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Input
                    type="text"
                    placeholder="Paste image URL"
                    value={imgUrl}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    className="w-1/2 bg-white text-black"
                />
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-1/2 bg-white text-black"
                />
            </div>
        </div>
    );
} 