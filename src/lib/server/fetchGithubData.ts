import axios from 'axios';

// Define the structure of the GitHub stats response
// export interface GitHubStatsResponse {
//   username: string;
//   name?: string;
//   avatarUrl?: string;
//   bio?: string;
//   followers?: number;
//   following?: number;
//   publicRepos?: number;
//   totalStars?: number;
//   contributions?: number;
//   // Add any other fields that your GitHub stats endpoint returns
// }

export const fetchGitHubData = async (username: string): Promise<any> => {
  if (!username.trim()) {
    throw new Error('GitHub username is required');
  }

  try {
    const response = await axios.post(
      "/api/v1/github/fetchGithubStats",
      { username },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw new Error('Failed to fetch GitHub data');
  }
};

export const fetchAndCacheGitHubData = async (username: string): Promise<any> => {
  // This function can be used if you want to implement server-side caching
  // For now, it just forwards to fetchGitHubData
  return fetchGitHubData(username);
};
