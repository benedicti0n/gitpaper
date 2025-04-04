import { create } from "zustand"

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