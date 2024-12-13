import React from 'react'
import { Button } from "@/components/ui/button"
import HeroSection from '@/components/landing/HeroSection'
import Navbar from '@/components/landing/Navbar'
import Pricing from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div className="bg-gray-900">
      <Navbar user={session?.user} />

      <HeroSection />

      <Pricing user={session?.user} />

      <Footer />
    </div>
  );
}