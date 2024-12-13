import React from "react";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <header className="py-24 bg-gray-900 text-center text-white">
      {/* Hero Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent leading-tight">
        Summarize Any Podcast Instantly
      </h1>
      {/* Supporting Text */}
      <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto">
        Leverage the power of AI to create concise summaries and uncover top questions from your favorite podcasts, all in seconds.
      </p>
      {/* Call-to-Action Button */}
      <div className="mt-6">
        <Button className="mt-4 w-44 h-12 bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors duration-200">
          Try it Now
        </Button>
      </div>
    </header>
  );
}
