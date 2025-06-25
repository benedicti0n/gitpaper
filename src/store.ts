import { create } from "zustand"
import { persist } from 'zustand/middleware';
import { IColorPallete, coolBluePalette, warmSunsetPalette, forestGreenPalette, vividPurplePalette, earthTonesPalette, monochromePalette } from "@/components/colorHues"

interface NavStore {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const useNavStore = create<NavStore>((set) => ({
    activeTab: "Home",
    setActiveTab: (tab) => set({ activeTab: tab })
}))


// <------- Navbar store end here -------> //


export interface Organization {
    name: string;
    avatarUrl: string;
}

export interface UserDetails {
    name: string;
    username: string;
    avatarUrl: string;
    bio: string;
    location: string;
    followingCount: number;
    followersCount: number;
    gistsCount: number;
    totalCommits: number;
    contributedReposCount: number;
    pullRequestsCount: number;
    issuesCount: number;
    organizationsCount: number;
    organizations: Organization[];
    contributedOrganizations: Organization[];
    sponsoringCount: number;
    sponsorsCount: number;
    accountCreatedAt: string; // ISO date
    lastUpdateAt: string; // ISO date
    totalRepositories: number;
    totalStars: number;
}

export interface StreakStats {
    totalContributions: number;
    firstDateofContribution: string;
    longestStreak: number;
    longestStreakStartDate: string;
    longestStreakEndDate: string;
    currentStreak: number;
    currentStreakStartDate: string | null;
    currentStreakEndDate: string | null;
}

export interface GitHubStats {
    userDetails: UserDetails;
    streakStats: StreakStats;
}

interface GithubDataStore {
    githubData: GitHubStats | null;
    setGithubData: (data: GitHubStats | null) => void;
}

export const useGithubDataStore = create<GithubDataStore>((set) => ({
    githubData: null,
    setGithubData: (data) => set({ githubData: data })
}))



// <------- Github store end here -------> //



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
        case "Monochrome":
            return monochromePalette;
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




// <------- Color Pallete store end here -------> //



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




// <------- Image Upload store end here -------> //



interface LoadingStore {
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
    isLoading: false,
    setLoading: (isLoading) => set({ isLoading }),
}));



// <------- Loading store end here -------> //