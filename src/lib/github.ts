import { UserDetails, UserData, GitHubResponse } from "@/types/github";
import { userDetailsQuery } from "../query/userDetailsQuery";

export const fetchUserDetails = async (username: string): Promise<UserDetails> => {
    const query = `
      query ($username: String!) {
        user(login: $username) {
          ${userDetailsQuery}
        }
      }
    `;
    console.log("inside fetchUserDetails");


    const response: GitHubResponse = await githubGraphql({
        query,
        variables: { username },
    });

    const { user } = response;

    console.log(user);


    const userDetails: UserDetails = getUserStats(user);
    userDetails.username = username;

    return userDetails;
};

const getUserStats = (userData: UserData): UserDetails => {
    // Calculate total stars across all repositories
    const totalStars = userData.repositoriesWithStargazerCount.nodes.reduce(
        (sum, repo) => sum + repo.stargazerCount,
        0
    );

    // console.log('Raw org data:', JSON.stringify(userData.organizationsContributedTo.nodes, null, 2));

    // Get unique organizations contributed to
    const contributedOrgs = userData.organizationsContributedTo.nodes
        .map(node => ({
            name: node.owner.login,        // Changed from name to login
            avatarUrl: node.owner.avatarUrl
        }))
        .filter((org, index, self) =>
            index === self.findIndex(o => o.name === org.name)  // Deduplication using login
        );

    const stats: UserDetails = {
        name: userData.name,
        username: '',
        avatarUrl: userData.avatarUrl,
        bio: userData.bio,
        location: userData.location,
        followingCount: userData.following.totalCount,
        followersCount: userData.followers.totalCount,
        gistsCount: userData.gists.totalCount,
        totalCommits: userData.contributionsCollection.totalCommitContributions,
        contributedReposCount: userData.repositoriesContributedTo.totalCount,
        pullRequestsCount: userData.pullRequests.totalCount,
        issuesCount: userData.issues.totalCount,
        organizationsCount: userData.organizations.totalCount,
        organizations: userData.organizations.nodes,
        contributedOrganizations: contributedOrgs,
        sponsoringCount: userData.sponsoring.totalCount,
        sponsorsCount: userData.sponsors.totalCount,
        accountCreatedAt: new Date(userData.createdAt),
        lastUpdateAt: new Date(userData.updatedAt),
        totalRepositories: userData.repositoriesWithStargazerCount.totalCount,
        totalStars,
    };

    return stats;
};

export async function githubGraphql({
    query,
    variables,
}: {
    query: string;
    variables: Record<string, any>;
}) {
    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN!}`,
                Accept: "application/vnd.github+json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            throw new Error(
                `GitHub API request failed with status ${response.status}`,
            );
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        throw error;
    }
}