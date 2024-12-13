import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginModal from "../auth/LoginModal";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";

export default function Navbar({ user }: { user?: CustomUser }) {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo and Branding */}
        <Link href="/">
          <div className="flex items-center space-x-3 cursor-pointer">
            <Image src="/images/icon_192.png" width={40} height={40} alt="PodBite Logo" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gradient">
              AI-Tube
            </h1>
          </div>
        </Link>

        {/* Navigation Links and Authentication */}
        <div className="flex items-center space-x-6">
          <Link href="/pricing">
            <Button variant="ghost" className="text-white hover:text-pink-400">
              Pricing
            </Button>
          </Link>
          {user ? (
            <Link href="/dashboard">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                Dashboard
              </Button>
            </Link>
          ) : (
            <LoginModal />
          )}
        </div>
      </div>
    </nav>
  );
}
