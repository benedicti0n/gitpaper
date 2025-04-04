import axios from "axios";
import { useState } from "react";
import { useGithubDataStore } from "@/store";

export const useGithubData = () => {
    const { setGithubData } = useGithubDataStore()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGithubData = async (username: string) => {
        if (!username.trim()) {
            alert("Enter a GitHub username!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/v1/github/fetchGithubStats",  // Updated Next.js API route
                { username }, // Data payload
                { headers: { "Content-Type": "application/json" } } // Headers
            );

            console.log(response.data);
            setGithubData(response.data); // Axios already parses JSON
        } catch (err) {
            console.error("GitHub API Fetch Error:", err);
            setError("Failed to fetch GitHub stats");
            setGithubData(null);
        } finally {
            setLoading(false);
        }
    };

    return { fetchGithubData, loading, error };
};
