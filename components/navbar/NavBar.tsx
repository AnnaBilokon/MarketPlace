"use client";
import React, { useState } from "react";
import Container from "../global/Container";
import Logo from "./Logo";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import CompanyListingModal from "../CompanyListingModal";

function Navbar() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <button
                onClick={handleOpenModal}
                className="px-4 py-2 bg-white outline text-black rounded-md hover:bg-black hover:text-white"
              >
                List a Company
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-white hover:outline hover:text-black"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="px-4 py-2 bg-[#aacae6] text-black rounded-md hover:bg-[#EBF6FB]">
                  Log In
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-white hover:outline hover:text-black">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </Container>
      <CompanyListingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </nav>
  );
}

export default Navbar;
