
import DashNav from "@/components/dashboard/DashNav";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getUserCoins, getUserOldSummaries } from "@/actions/fetchActions";
import UrlInput from "@/components/dashboard/UrlInput";
import OldSummaryCard from "@/components/dashboard/OldSummaryCard";

export default async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const oldSummaries = await getUserOldSummaries(Number(session?.user?.id!));
  const userCoins = await getUserCoins(session?.user?.id!);

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-white py-8 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <DashNav user={session?.user!} userCoins={userCoins} />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="border-purple-600 border-4 rounded-lg shadow-xl p-8 mb-10 space-y-6 hover:scale-105 transition duration-300">
          <h1 className="text-3xl font-semibold text-gray-100 text-center">
            Welcome, {session?.user?.name}!
          </h1>
          <p className="text-lg text-gray-300 text-center">
            Manage your content, view old summaries, and much more.
          </p>

          {/* Url Input */}
          <div className="flex justify-center mt-6">
            <UrlInput user={session?.user!} />
          </div>
        </div>

        {/* Old Summaries Section */}
        <div className="space-y-8 mt-10">
          <h2 className="text-2xl font-semibold text-gray-100 text-center">
            Your Summarized Content
          </h2>

          {/* Grid of Old Summaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oldSummaries.length > 0 ? (
              oldSummaries.map((item, index) => (
                <OldSummaryCard key={index} summary={item} />
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                <p>No summaries found. Start summarizing now!</p>
                <img
                  src="/no-data.svg"
                  alt="No Data"
                  className="w-48 mx-auto mt-6"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
