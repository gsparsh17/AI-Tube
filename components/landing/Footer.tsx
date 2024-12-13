import React from "react";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="container mx-auto flex flex-col items-center space-y-6 text-center">
        {/* Branding */}
        <p className="text-sm md:text-base">
          © {new Date().getFullYear()} <span className="font-semibold">PodBite</span>. All rights reserved.
        </p>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center space-x-4">
          <Button
            variant="link"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Privacy Policy
          </Button>
          <Button
            variant="link"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Terms of Service
          </Button>
          <Button
            variant="link"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Contact
          </Button>
        </div>
      </div>
    </footer>
  );
}
