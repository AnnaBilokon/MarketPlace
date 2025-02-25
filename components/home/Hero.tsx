"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "../../public/Hero.jpg";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import CompanyListingModal from "@/components/CompanyListingModal";

export default function Hero() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSellCompanyClick = () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      router.push("/login");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div>
        <h1 className="max-w-2xl font-semibold text-3xl tracking-tight sm:text-6xl sm:leading-[70px]">
          Buy & Sell Companies with Confidence
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Discover a seamless marketplace where entrepreneurs and investors
          connect. Browse thriving businesses, list your company for sale, and
          make deals with ease.
        </p>
        <div className="flex gap-5">
          <Button
            asChild
            size="lg"
            className="mt-10 text-lg w-56 bg-[#aacae6] hover:bg-[#EBF6FB] hover:border-[##EBF6FB] text-black"
          >
            <Link href="#companies">Explore</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="mt-10 text-lg border-1 border-[#aacae6] w-56 hover:bg-black hover:text-white"
            onClick={handleSellCompanyClick}
          >
            <Link href="/login">Sell a Company</Link>
          </Button>
        </div>
      </div>
      <Image src={HeroImage} alt="hero" className="rounded-md" />
      <CompanyListingModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}
