import { getSummary, getUserCoins } from "@/actions/fetchActions";
import DashNav from "@/components/dashboard/DashNav";
import SummaryBase from "@/components/summary/SummaryBase";
import { notFound } from "next/navigation";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Summarize({
  searchParams,
}: {
  searchParams: any;
}) {
  if (!searchParams?.["id"]) {
    return notFound();
  }
  const summary = await getSummary(searchParams?.["id"]);
  if (!summary) {
    return notFound();
  }
  const session: CustomSession | null = await getServerSession(authOptions);
  const userCoins = await getUserCoins(session?.user?.id!);


  return (
    <div className=" bg-gray-900">
      <div className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-white py-8 shadow-lg">
              <div className="container mx-auto flex justify-between items-center">
                <DashNav user={session?.user!} userCoins={userCoins} />
              </div>
            </div>
      <SummaryBase summary={summary} />
    </div>
  );
}
