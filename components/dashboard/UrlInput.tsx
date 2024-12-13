"use client";

import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loading from "../common/Loading";
import { clearCache } from "@/actions/commonActions";

export default function UrlInput({ user }: { user: CustomUser }) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AddUrlErrorType>({});

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setLoading(true);
      const { data } = await axios.post("/api/add-url", {
        url: url,
        user_id: user.id,
      });
      const newChat: ChatType = data?.data;
      if (newChat) {
        toast.success("URL is correct! Redirecting to the summary window...");
        clearCache("oldSummaries");
        router.push(`/summarize/?id=${newChat.id}`);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          setErrors(error.response?.data?.errors);
        } else {
          toast.error(error.response?.data?.message);
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 w-full space-y-4">
      {/* Form */}
      <form onSubmit={handleSubmit} className="relative w-full md:w-[500px]">
        <input
          type="text"
          className="h-12 rounded-lg bg-gray-50 border border-purple-300 p-3 w-full text-sm md:w-[500px] outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 placeholder-gray-400 disabled:opacity-50"
          placeholder="Enter your podcast URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        {loading && (
          <div className="absolute right-3 top-2.5">
            <Loading />
          </div>
        )}
      </form>

      {/* Error Message */}
      {errors?.url && (
        <span className="text-sm text-red-500 font-medium">{errors.url}</span>
      )}
    </div>
  );
}
