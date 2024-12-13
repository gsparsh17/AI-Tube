import React from "react";
import ProfileDropdown from "../common/ProfileDropdown";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import Link from "next/link";

export default async function DashNav({
  user,
  userCoins,
}: {
  user: CustomUser;
  userCoins: CoinsType | null;
}) {
  return (
    <nav className="w-full flex justify-between items-center h-16 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      {/* Logo and Title */}
      <Link href="/">
        <div className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
          <Image
            src="/images/icon_192.png"
            width={40}
            height={40}
            alt="logo"
            className="rounded-full"
          />
          <h1 className="text-2xl font-extrabold text-white tracking-wide">
            AI-Tube
          </h1>
        </div>
      </Link>

      {/* Coins and Profile */}
      <div className="flex items-center space-x-6">
        {/* Coins Section */}
        <div className="flex items-center space-x-2 bg-white bg-opacity-20 py-1 px-3 rounded-full shadow-sm">
          <span className="text-lg font-semibold text-white">
            {userCoins?.coins ?? 0}
          </span>
          <Image
            src="/images/coin.png"
            width={30}
            height={30}
            alt="coin"
            className="drop-shadow-lg"
          />
        </div>

        {/* Profile Dropdown */}
        <ProfileDropdown user={user} />
      </div>
    </nav>
  );
}
