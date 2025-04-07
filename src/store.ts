import { create } from "zustand"
import { persist } from 'zustand/middleware';
import { IColorPallete, coolBluePalette, warmSunsetPalette, forestGreenPalette, vividPurplePalette, earthTonesPalette } from "@/components/colorHues"

interface NavStore {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const useNavStore = create<NavStore>((set) => ({
    activeTab: "Home",
    setActiveTab: (tab) => set({ activeTab: tab })
}))

interface GithubDataStore {
    githubData: any | null;
    setGithubData: (data: any | null) => void;
}

export const useGithubDataStore = create<GithubDataStore>((set) => ({
    githubData: null,
    setGithubData: (data) => set({ githubData: data })
}))

interface ColorPaletteStore {
    currentPalette: IColorPallete;
    setCurrentPalette: (paletteName: string) => void;
}

const getPaletteByName = (name: string): IColorPallete => {
    switch (name) {
        case "Cool Blue":
            return coolBluePalette;
        case "Warm Sunset":
            return warmSunsetPalette;
        case "Forest Green":
            return forestGreenPalette;
        case "Ellie's Purple":
            return vividPurplePalette;
        case "Earth Tone":
            return earthTonesPalette;
        default:
            return coolBluePalette;
    }
}

export const useColorPaletteStore = create<ColorPaletteStore>()(
    persist(
        (set) => ({
            currentPalette: coolBluePalette,
            setCurrentPalette: (paletteName) => {
                const newPalette = getPaletteByName(paletteName);
                set({ currentPalette: newPalette });
            },
        }),
        {
            name: 'color-palette-storage', // localStorage key
        }
    )
);


export type Position = "Top Left" | "Top Right" | "Bottom Left" | "Right Side" | "Background";

export interface ImageEntry {
    position: Position;
    imgUrl: string;
}

export interface ImageUploadStore {
    data: ImageEntry[];
    setData: (position: Position, imgUrl: string) => void;
}

export const useImageUploadStore = create<ImageUploadStore>()(
    persist(
        (set) => ({
            data: [],
            setData: (position, imgUrl) =>
                set((state) => {
                    const filtered = state.data.filter((entry) => entry.position !== position);
                    return { data: [...filtered, { position, imgUrl }] };
                }),
        }),
        {
            name: 'image-upload-storage', // localStorage key
        }
    )
);