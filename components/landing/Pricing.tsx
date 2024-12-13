"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import getStripe from "@/lib/stripe";

export default function Pricing({ user }: { user?: CustomUser }) {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async (plan: string) => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/stripe/session", { plan });
      if (data?.id) {
        const stripe = await getStripe();
        await stripe?.redirectToCheckout({ sessionId: data.id });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "Error occurred.");
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-center text-indigo-500 font-semibold mb-10">
          1 coin = 1 ₹
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <Card className={cn("shadow-xl transition-transform transform hover:scale-105")}>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-indigo-500">Starter</CardTitle>
              <p className="text-sm text-gray00">Perfect for individuals.</p>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-extrabold text-gray-100">100 Coins</p>
              <ul className="mt-6 space-y-2 text-gray-400">
                <li>10 Podcast Summaries</li>
                <li>Top Questions Highlight</li>
                <li>AI-Powered Insights</li>
              </ul>
              <Button
                className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={() => initiatePayment("Starter")}
                disabled={loading}
              >
                {loading ? "Processing..." : "Buy Coins"}
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card
            className={cn(
              "shadow-xl border-2 border-indigo-500 transition-transform transform hover:scale-105"
            )}
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold text-indigo-500">Pro</CardTitle>
              <p className="text-sm text-gray-100">Best for professionals.</p>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-extrabold text-gray-100">500 Coins</p>
              <ul className="mt-6 space-y-2 text-gray-400">
                <li>51 Podcast Summaries</li>
                <li>Top Questions Highlight</li>
                <li>AI-Powered Insights</li>
                <li>Priority Support</li>
                <li>Get One Podcast Summary Free 🚀</li>
              </ul>
              <Button
                className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={() => initiatePayment("Pro")}
                disabled={loading}
              >
                {loading ? "Processing..." : "Buy Coins"}
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plus Plan */}
          <Card className={cn("shadow-xl transition-transform transform hover:scale-105")}>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-indigo-500">Pro Plus</CardTitle>
              <p className="text-sm text-gray-100">Ideal for teams.</p>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-extrabold text-gray-100">1000 Coins</p>
              <ul className="mt-6 space-y-2 text-gray-400">
                <li>102 Podcast Summaries</li>
                <li>Top Questions Highlight</li>
                <li>AI-Powered Insights</li>
                <li>Dedicated Support</li>
                <li>Get Two Podcast Summaries Free 🚀</li>
              </ul>
              <Button
                className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={() => initiatePayment("Pro Plus")}
                disabled={loading}
              >
                {loading ? "Processing..." : "Buy Coins"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
