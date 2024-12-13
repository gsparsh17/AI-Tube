"use client";

import Link from "next/link";
import React from "react";

export default function OldSummaryCard({
  summary,
}: {
  summary: UserSummaries;
}) {
  return (
    <div className="bg-gradient-to-r from-indigo-600/30 via-purple-700/30 to-pink-600/30 bg-opacity-30 text-white shadow-lg rounded-lg p-6 h-64 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-white truncate">
        {summary.title}
      </h1>

      {/* URL Link */}
      <Link
        href={`/summarize?id=${summary.id}`}
        className="text-indigo-200 underline text-sm truncate hover:text-indigo-300 transition-colors"
      >
        {summary.url}
      </Link>

      {/* Created At */}
      <p className="text-gray-300 text-sm mt-2">
        <span className="font-medium text-gray-200">Created At:</span>{" "}
        {new Date(summary.created_at).toDateString()}
      </p>
    </div>
  );
}
