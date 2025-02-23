"use client";
import React, { useState } from "react";
import Container from "../global/Container";
import Logo from "./Logo";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import CompanyListingModal from "../CompanyListingModal";
import { HiOutlineUser } from "react-icons/hi";
import { IoMdMenu } from "react-icons/io";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
              {/* <Button
                onClick={toggleDropdown}
                className="px-4 py-2 bg-white outline text-black rounded-md hover:bg-black hover:text-white"
              >
                <div className="flex">
                  <HiOutlineUser className="text-2xl mr-2" />
                  <IoMdMenu className="text-2xl" />
                </div>
              </Button> */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="px-4 py-2 bg-white outline text-black rounded-md hover:bg-black hover:text-white">
                    <div className="flex">
                      <HiOutlineUser className="text-2xl mr-2" />
                      <IoMdMenu className="text-2xl" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg border border-gray-200 rounded-md">
                  <DropdownMenuItem
                    onClick={handleOpenModal}
                    className="w-full text-black py-2 px-4 hover:bg-gray-100"
                  >
                    List a Company
                  </DropdownMenuItem>

                  <Link href="/seller-dashboard">
                    <DropdownMenuItem className="w-full text-black py-2 px-4 hover:bg-gray-100">
                      Show interests
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    onClick={logout}
                    className="w-full text-black py-2 px-4 hover:bg-gray-100"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <ul>
                    <li>
                      <Link href="/profile">
                        <Button
                          onClick={handleOpenModal}
                          className="w-full text-black py-2 px-4 hover:bg-gray-100"
                        >
                          List a Company
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Button
                        onClick={logout}
                        className="w-full text-black py-2 px-4 hover:bg-gray-100"
                      >
                        Logout
                      </Button>
                    </li>
                  </ul> */}
            </>
          ) : (
            <>
              <Link href="/login">
                <Button className="px-4 py-2 bg-[#aacae6] text-black rounded-md hover:bg-[#EBF6FB]">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="px-4 py-2 bg-black text-white rounded-md hover:bg-white hover:outline hover:text-black">
                  Sign Up
                </Button>
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
