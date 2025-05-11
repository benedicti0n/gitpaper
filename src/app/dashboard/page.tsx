"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/ui/tubelight-navbar";
import DashboardPage from "@/components/Dashboard/DashboardPage";

const Dashboard = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div>
      <NavBar />
      <DashboardPage isLoaded={isLoaded} />
    </div>
  );
};

export default Dashboard;
