import axios from "axios";
import { useState, useEffect } from "react";
import { useGithubDataStore } from "@/store";
import { toast } from "sonner";

const CACHE_DURATION = 10 * 60 * 1000; // 5 minutes in milliseconds
const CACHE_KEY = 'githubDataCache';

interface CacheData {
    data: any;
    timestamp: number;
}

export const useGithubData = () => {
    const { setGithubData } = useGithubDataStore()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load cached data on component mount
    useEffect(() => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const { data, timestamp }: CacheData = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_DURATION) {
                setGithubData(data);
            } else {
                localStorage.removeItem(CACHE_KEY);
            }
        }
    }, [setGithubData]);

    const fetchGithubData = async (username: string) => {
        if (!username.trim()) {
            toast.error("Enter a GitHub username!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/v1/github/fetchGithubStats",
                { username },
                { headers: { "Content-Type": "application/json" } }
            );

            const data = response.data;
            console.log(data);
            setGithubData(data);

            // Cache the data with timestamp
            const cacheData: CacheData = {
                data,
                timestamp: Date.now()
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
            toast.success("GitHub stats fetched successfully");
        } catch (error) {
            toast.error("No user found! Try again.");
            console.error(error);
            setGithubData(null);
        } finally {
            setLoading(false);
        }
    };

    return { fetchGithubData, loading, error };
};
