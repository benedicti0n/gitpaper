"use client";
import { useCallback, useEffect, useState } from "react";

import { Activity, ActivityCalendar } from "react-activity-calendar";

type GithubGraphProps = {
  username: string;
  blockMargin?: number;
  colorPallete: string[];
  scrollbarColor1: string;
  scrollbarColor2: string;
};

const GithubGraph = ({
  username,
  blockMargin,
  colorPallete,
  scrollbarColor1,
  scrollbarColor2,
}: GithubGraphProps) => {
  const [contribution, setContribution] = useState<Activity[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const contributions = await fetchContributionData(username);
      setContribution(contributions);
    } catch {
      throw Error("Error fetching contribution data in fetchData");
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const label = {
    totalCount: `{{count}} contributions in the last year`,
  };

  return (
    <>
      <div className="w-full h-full overflow-auto">
        <style jsx>{`
          ::-webkit-scrollbar {
            height: 6px;
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: ${scrollbarColor2};
            border-radius: 3px;
          }
          ::-webkit-scrollbar-thumb {
            background: ${scrollbarColor1};
            border-radius: 3px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: ${scrollbarColor1};
          }
        `}</style>
        <ActivityCalendar
          data={contribution}
          maxLevel={4}
          blockMargin={blockMargin ?? 2}
          loading={loading}
          labels={label}
          theme={{
            light: colorPallete,
            dark: colorPallete,
          }}
          colorScheme="light"
        />
      </div>
    </>
  );
};
async function fetchContributionData(username: string): Promise<Activity[]> {
  const response = await fetch(`https://github.vineet.pro/api/${username}`);
  const responseBody = await response.json();

  if (!response.ok) {
    throw Error("Erroring fetching contribution data in fetchContributionData");
  }
  return responseBody.data;
}

export default GithubGraph